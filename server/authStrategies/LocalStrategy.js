import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User.js";

//Called during login/sign up.
passport.use(new Strategy(User.authenticate()))

//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser())

//called while after logging out / signing out to set user details in req.user
passport.deserializeUser(User.deserializeUser())