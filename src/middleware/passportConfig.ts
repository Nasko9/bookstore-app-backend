// Modules
import passport from "passport";
import localStrategy from "passport-local";
// Model
import User from "../models/userModel";

passport.use(new localStrategy.Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

export default passport;
