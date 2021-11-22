import User from "../models/User.js";
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authStrategies/authenticate.js";
import jwt from "jsonwebtoken";

export const createNewUser = async (req, res) => {
    try {
      User.register(
        new User({ username: req.body.username,
          email: req.body.email
        }),
        req.body.password,
        (error, user) => {
          if (error) {
            res.status(500).json(error)
          } else {
            const token = getToken({ _id: user._id, username: user.username, email: user.email })
            const refreshToken = getRefreshToken({ _id: user._id, username: user.username, email: user.email })
            user.refreshToken.push({ refreshToken })
            user.save((error, user) => {
              if (error) {
                res.statusCode = 500
                res.send(error)
                console.log(error)
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.send({ success: true, token, _id: user._id, username: user.username, email: user.email })
              }
            })
          }
        }
      )
  } catch (error) {
      res.status(500).json(error)
  }
}

//after user is has been authenticated
export const logInUser = async (req, res, next) => {
    try {
      const token = getToken({ _id: req.user._id, username: req.user.username, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture, coverPicture: req.user.coverPicture, description: req.user.description, city: req.user.city, from: req.user.from, relationship: req.user.relationship, provider: req.user.provider })
      const refreshToken = getRefreshToken({  _id: req.user._id, username: req.user.username, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture, coverPicture: req.user.coverPicture, description: req.user.description, city: req.user.city, from: req.user.from, relationship: req.user.relationship, provider: req.user.provider })
      await User.findOne({ username: req.user.username}).then((user)=>{
          user.refreshToken.push({ refreshToken })
          user.save((error, user) => {
            if (error) {
              res.status(500).json(error)
            } else {
              //sending the cookie
              res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
              res.send({ success: true, token,  _id: req.user._id, username: req.user.username, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture, coverPicture: req.user.coverPicture, description: req.user.description, city: req.user.city, from: req.user.from, relationship: req.user.relationship, provider: req.user.provider })
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
        //     const newUser = new User({
        //         username: req.body.username,
        //         email: req.body.email,
        //         provider: req.params.provider,
        //     });
        //     user = await newUser.save();
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
              const token = getToken({ _id: userId, username: user.username, email: user.email, college: user.college, profilePicture: user.profilePicture, coverPicture: user.coverPicture, description: user.description, city: user.city, from: user.from, relationship: user.relationship, provider: user.provider })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId, username: user.username, email: user.email, college: user.college, profilePicture: user.profilePicture, coverPicture: user.coverPicture, description: user.description, city: user.city, from: user.from, relationship: user.relationship, provider: user.provider })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((error, user) => {
                if (error) {
                  res.status(500).json(error)
                  next()
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ success: true, token, _id: userId, username: user.username, email: user.email, college: user.college, profilePicture: user.profilePicture, coverPicture: user.coverPicture, description: user.description, city: user.city, from: user.from, relationship: user.relationship, provider: user.provider })
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
  console.log("from logout: " + refreshToken)
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