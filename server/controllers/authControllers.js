import User from "../models/User.js";
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authStrategies/authenticate.js";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
    try {
      User.register(
        new User({ username: req.body.username,
          email: req.body.email,
          name: req.body.name,
        }),
        req.body.password,
        (error, user) => {
          if (error) {
            res.status(200).json({success: false, ...error})
          } else {
            const token = getToken({ _id: user._id, username: user.username, name: user.name, email: user.email })
            const refreshToken = getRefreshToken({ _id: user._id, username: user.username, name: user.name, email: user.email })
            user.refreshToken.push({ refreshToken })
            user.save((error, user) => {
              if (error) {
                res.status(500).json(error)
                console.log(error)
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token, _id: user._id, username: user.username, name: user.name, email: user.email })
              }
            })
          }
        }
      )
  } catch (error) {
      res.status(500).json(error)
      console.log(":::::::::::::::::::::::::::::::::22222222222222222 \n" + error)

  }
}

export const logInUser = async (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id, username: req.user.username, name: req.user.name, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture })
    const refreshToken = getRefreshToken({  _id: req.user._id, username: req.user.username, name: req.user.name, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture })
    await User.findOne({ username: req.user.username}).then((user)=>{
      user.refreshToken.push({ refreshToken })
      user.save((error, user) => {
        if (error) {
          res.status(500).json(error)
        } else {
          //sending the cookie
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ success: true, token,  _id: req.user._id, username: req.user.username, name: req.user.name, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture })
        }
      })
    })
  } catch (error) {
    next(error)
      res.status(500).json(error)
      console.log(error)
  }
}

export const logInWithProvider = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email });
        if(!user) {user = await User.findOne({ username: req.body.email })}
        // if(!user){
        //     const req.user = new User({
        //         username: req.body.username,
        //         email: req.body.email,
        //         provider: req.params.provider,
        //     });
        //     user = await req.user.save();
        // }
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export const resetUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.changePassword(req.body.oldpassword, req.body.newpassword, function(error, user){ if(error){res.status(401).json(error)}else{res.status(200).json(user)} })
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const socialsLoginSuccess = async (req, res)=>{
	if(!Object.keys(req.authInfo).length){
		const refreshToken = getRefreshToken({ _id: req.user._id, username: req.user.username, name: req.user.name, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture })
		await User.findByIdAndUpdate(req.user._id, {refreshToken: {refreshToken}})
		res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
		res.redirect(process.env.CLIENT_URL)
  }else{
	res.redirect(process.env.CLIENT_URL+'/login?errorC='+req.authInfo.errorC+'&errorM='+req.authInfo.errorM)
}
}

export const socialsLoginFailed = async (req, res) => {
  res.status(401).json({success: false, message: "Login Failed, Please Try Again"})
  console.log(error)
}

//refresh token
export const refreshToken = (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
      const userId = payload._id
      User.findOne({ _id: userId }).then(
        user => {
          if (user) {
            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
              item => item.refreshToken === refreshToken
            )

            if (tokenIndex === -1) {
              res.status(401).json("Unauthorized")
              next()
            } else {
              const token = getToken({ _id: userId, username: user.username, name: user.name, email: user.email, college: user.college, profilePicture: user.profilePicture })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId, username: user.username, name: user.name, email: user.email, college: user.college, profilePicture: user.profilePicture })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((error, user) => {
                if (error) {
                  res.status(500).json(error)
                  next()
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ success: true, token, _id: userId, username: user.username, name: user.name, email: user.email, college: user.college, profilePicture: user.profilePicture })
                  next()
                }
              })
            }
          } else {
            res.status(401).json("Unauthorized")
            next()
          }
        },
        error => next(error)
      )
    } catch (error) {
      res.status(401).json("Unauthorized")
      next()
    }
  } else {
    res.status(401).json("Unauthorized")
    next()
  }
}

export const logOutUser = async (req, res, next) => {
  const { signedCookies = {} } = req
  const { refreshToken } = signedCookies
  //remove active refresh token
  User.findById(req.user._id).then(
    user => {
      const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken
      )

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
      }

      user.save((error, user) => {
        if (error) {
          res.status(500).json(error)
        } else {
          res.clearCookie("refreshToken", COOKIE_OPTIONS)
          res.send({ success: true })
        }
      })
    },
    error => next(error)
  )
}