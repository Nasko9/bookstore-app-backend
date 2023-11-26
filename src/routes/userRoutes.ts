// Modules
import express, { Request, Response } from "express";
// Model
import User from "../models/userModel";
// Middleware
import { userValidationRules, validate } from "../middleware/validation";

const router = express.Router();

router.post(
  "/register",
  userValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const {
        name,
        lastname,
        email,
        mobilePhone,
        country,
        city,
        street,
        streetNumber,
        postalCode,
        sex,
        agreedToTerms,
        password,
      } = req.body;

      const user = new User({
        name,
        lastname,
        email,
        mobilePhone,
        country,
        city,
        street,
        streetNumber,
        postalCode,
        sex,
        agreedToTerms,
      });

      await User.register(user, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  }
);

export default router;
