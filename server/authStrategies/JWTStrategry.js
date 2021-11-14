import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import User from "../models/User.js";
import { refreshToken } from "../controllers/authControllers.js";
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
  new Strategy(opts, function (jwt_payload, done) {
    // Check against the DB only if necessary.
    if(!jwt_payload.college || jwt_payload.college === ''){
      console.log("not found")
      User.findOne({_id: jwt_payload._id}).then((user)=>{
        return done( null, user)
      })
    }else{
      console.log(jwt_payload)
      return done(null, jwt_payload)
    }    
  })
)