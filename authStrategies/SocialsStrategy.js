import { Strategy as GoogleStrategy} from "passport-google-oauth20"
import { Strategy as FacebookStrategy } from "passport-facebook"
import { Strategy as TwitterStrategy} from "passport-twitter" 
import User from "../models/User.js"
import passport from "passport"

const getOrdinalNum = (n) => 
n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '')


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.BASE_URL+"/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({providerId: profile.id}, function (error, user) {
      if(!user){
        var newUser = new User({
          providerId: profile.id,
          providerToken: accessToken,
          name: profile.displayName,
          username: 'user'+profile.id,
          provider: profile.provider,
          profilePicture: profile._json.picture,
          email: profile._json.email,
        });
        newUser.save((error) => {
          if (error) {
            if(error.code === 11000){
              const _error = {
                errorC: "E11000",
                errorM: "User with the " + Object.keys(error.keyValue)[0] + " " + error.keyValue[(Object.keys(error.keyValue)[0])] + " already exists"
              }
              return done(null, newUser, _error)
            }else{
              const error = {
                errorC: (error.code).toString(),
                errorM: error.message
              }
              console.log(error)
              return done(null, newUser, error)
            }

          } else {
            return done(null, newUser);
          }
        });
      }else{
        return done(null, user)
      }
      if(error){
        console.log(error.code)
      }
    })
  }
));

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.BASE_URL+"/api/auth/facebook/callback",
      profileFields: ['id', 'email', 'gender', 'birthday', 'name', 'picture.type(large)' ],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile)
      User.findOne({providerId: profile.id}, function (error, user) {
        if(!user){
          var newUser = new User({
            providerId: profile.id,
            providerToken: accessToken,
            username: profile._json.username ? profile._json.username : 'user'+profile.id,
            name: ((profile._json.first_name?profile._json.first_name :'') +' '+ (profile._json.last_name?profile._json.last_name:'') + ' ' + (profile._json.middle_name?profile._json.middle_name:'')).trim(),
            provider: profile.provider,
            profilePicture: profile.photos[0].value,
            email: profile._json.email ? profile._json.email : '',
            gender: profile._json.gender ? profile._json.gender : '',
            birthday: profile._json.birthday ? ((new Date((profile._json.birthday.split('/')[2] + '-' + profile._json.birthday.split('/')[0] + '-' + profile._json.birthday.split('/')[1]) + "T00:00:00")).toDateString()).replace(profile._json.birthday.split('/')[1], getOrdinalNum((profile._json.birthday.split('/')[1]).replace('0', ''))) : '',
          });
          newUser.save((error) => {
            if (error) {
              if(error.code === 11000){
                const _error = {
                  errorC: "E11000",
                  errorM: "User with the " + Object.keys(error.keyValue)[0] + " " + error.keyValue[(Object.keys(error.keyValue)[0])] + " already exists"
                }
                return done(null, newUser, _error)
              }else{
                const error = {
                  errorC: (error.code).toString(),
                  errorM: error.message
                }
                console.log(error)
                return done(null, newUser, error)
              }

            } else {
              return done(null, newUser);
            }
          });
        }else{
          return done(null, user)
        }
        if(error){
          console.log(error.code)
        }
      })
    }
));

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_ID,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: process.env.BASE_URL+"/api/auth/twitter/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({providerId: profile.id}, function (error, user) {
        if(!user){
          var newUser = new User({
            providerId: profile.id,
            providerToken: accessToken,
            name: profile.displayName,
            username: profile.username,
            provider: profile.provider,
            profilePicture: profile.photos[0].value,
            email: profile._json.email,
            description: profile._json.description,
          });
          newUser.save((error) => {
            if (error) {
              if(error.code === 11000){
                const _error = {
                  errorC: "E11000",
                  errorM: "User with the " + Object.keys(error.keyValue)[0] + " " + error.keyValue[(Object.keys(error.keyValue)[0])] + " already exists"
                }
                return done(null, newUser, _error)
              }else{
                const error = {
                  errorC: (error.code).toString(),
                  errorM: error.message
                }
                console.log(error)
                return done(null, newUser, error)
              }

            } else {
              return done(null, newUser);
            }
          });
        }else{
          return done(null, user)
        }
        if(error){
          console.log(error.code)
        }
      })
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
