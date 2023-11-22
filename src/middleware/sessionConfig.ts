// Modules
import session from "express-session";

const sessionOption = {
  secret: "secret key",
  resave: false,
  saveUninitialized: false,
};

export const sessionMiddleware = session(sessionOption);
