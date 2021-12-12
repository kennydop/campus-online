import User from "../models/User.js";
import { getToken, COOKIE_OPTIONS, getRefreshToken } from "../authStrategies/authenticate.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js"

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
            if(error.code){
              res.status(200).json({success: false, name: "UserExistsError", message: "A user with the given email is already registered"})
            }else{
              res.status(200).json({success: false, name: "UserExistsError", message: "A user with the given username is already registered"})
            }
          } else {
            const token = getToken({ _id: user._id, username: user.username})
            const refreshToken = getRefreshToken({ _id: user._id, username: user.username })
            user.refreshToken.push({ refreshToken })
            user.save((error, user) => {
              if (error) {
                res.status(500).json(error)
                console.log(error)
              } else {
                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.send({ token, _id: user._id, username: user.username, name: user.name, email: user.email, preferences: user.preferences })
              }
            })
          }
        }
      )
  } catch (error) {
      res.status(500).json(error)
  }
}

export const logInUser = async (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id, username: req.user.username })
    const refreshToken = getRefreshToken({  _id: req.user._id, username: req.user.username })
    await User.findOne({ username: req.user.username }).then((user)=>{
      user.refreshToken.push({ refreshToken })
      user.save((error, user) => {
        if (error) {
          res.status(500).json(error)
        } else {
          //sending the cookie
          res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
          res.send({ token,  _id: req.user._id, username: req.user.username, name: req.user.name, email: req.user.email, college: req.user.college, profilePicture: req.user.profilePicture, preferences: req.user.preferences })
        }
      })
    })
  } catch (error) {
    next(error)
      res.status(500).json(error)
      console.log(error)
  }
}

export const changeUserPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.changePassword(req.body.oldpassword, req.body.newpassword, function(error, user){
      if(error){
        res.status(200).json(error)
      }else{
        res.status(200).json("Password resetted succesfully")
      } 
    })
  } catch (error) {
    return res.status(500).json(error);
  }
}

export const socialsLoginSuccess = async (req, res)=>{
	if(!Object.keys(req.authInfo).length){
		const refreshToken = getRefreshToken({ _id: req.user._id, username: req.user.username })
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
  console.log(refreshToken)
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
              const token = getToken({ _id: userId, username: user.username })
              // If the refresh token exists, then create new one and replace it.
              const newRefreshToken = getRefreshToken({ _id: userId, username: user.username })
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken }
              user.save((error, user) => {
                if (error) {
                  res.status(500).json(error)
                  next()
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS)
                  res.send({ token, _id: user._id, username: user.username, name: user.name, email: user.email, college: user.college, profilePicture: user.profilePicture, preferences: user.preferences })
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

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.email}]})
    if(!user){
      res.send({error: true, msg: "No user found"})
    }else{
      if(user.provider === "email"){
        delete user.refreshToken
        const token = jwt.sign({_id: user._id, _exp: new Date()}, process.env.JWT_SECRET, {expiresIn: "10m"})
        const html = `<div style="padding: 1.5rem">
                        <img src="https://res.cloudinary.com/kennydop/image/upload/v1638432882/campus-online/defaults/campus-online-logo_ashdlp.png"/>
                        <p>Hi ${user.name}, <br/>
                        Sorry to hear you’re having trouble logging into Campus Online. You can click on the button below to reset your password.</p>
                        <a style = 'text-align: center; display: block; padding: 10px 16px 14px 16px; margin: 0 2px 0 auto; min-width: 80px; background-color: #e74799; border-radius: 9999px; color: white' href=${process.env.BASE_URL}/api/auth/validate-password-reset/${user._id}/${token}>Reset Password</a>
                        <p> If you didn't request a password reset, please ignore this</p>
                      </div>`
        await sendEmail(user.email, "Password reset", html);
        res.send({email: true, msg: "Password reset link has been sent to your email. Link expires in 10 minutes. Can't find it? check your spam"});
      }else{
        res.send({error: true, msg: `This account is connected with ${user.provider}. Please try logging in with ${user.provider}`});
      }
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
};

export const validatePasswordReset = async (req, res) => {
  try {
    const info = jwt.decode(req.params.token)
    if(Date.now() >= info.exp * 1000){
      res.redirect(`${process.env.CLIENT_URL}/forgotpassword?error=1101`)
    }else{
      res.redirect(`${process.env.CLIENT_URL}/forgotpassword?u=${req.params.id}`)
    }
  }catch(error){
    console.log(error)
    res.send(error)
  }
};

export const resetPassword = async (req, res) => {
  try{
    const user = await User.findById(req.params.id)
    user.setPassword(req.body.password, (error, user)=>{
      if(error){
        res.send({msg: "There was an error resseting your password, please try again"})
      }else if(user){
        const token = getToken({ _id: user._id, username: user._doc.username})
        const refreshToken = getRefreshToken({ _id: user._id, username: user._doc.username })
        user.refreshToken.push({ refreshToken })
        user.save((error, user) => {
          if (error) {
            res.redirect(process.env.CLIENT_URL+'/login?errorC=1102'+'&errorM=There was an error logging you in')
          } else {
            delete user._doc.refreshToken
            delete user._doc.updatedAt,
            delete user._doc.__v,
            delete user._doc.provider, 
            delete user._doc.salt,
            delete user._doc.hash,
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
            res.send({ token, ...user._doc })
          }
        })
      }
    })
  }catch{

  }
}
