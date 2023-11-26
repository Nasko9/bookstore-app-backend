// Modules
import {
  body,
  validationResult,
  ValidationChain,
  ValidationError,
} from "express-validator";
import { Request, Response, NextFunction } from "express";
import { getCode } from "country-list";
// Data
import { countreisCodes } from "../data/countriesCodes";

export const userValidationRules = (): ValidationChain[] => {
  return [
    body("name", "Name must be at least 2 characters long")
      .trim()
      .isLength({ min: 2, max: 50 }),

    body("lastname", "Last name must be at least 2 characters long")
      .trim()
      .isLength({ min: 2, max: 50 }),

    body("email", "Enter a valid email address").isEmail().normalizeEmail(),

    body("mobilePhone")
      .isString()
      .withMessage("Mobile phone must be a string")
      .not()
      .isEmpty()
      .withMessage("Mobile phone cannot be empty")
      .trim()
      .isMobilePhone("any", { strictMode: false })
      .withMessage("Must be a valid mobile phone number"),

    body("country")
      .isString()
      .withMessage("Country must be a string")
      .custom(countryName => {
        const countryCode = getCode(countryName);
        if (!countryCode || !countreisCodes.includes(countryCode)) {
          throw new Error("This country doesn't exist");
        }
        return true;
      }),

    body("city", "City name must be at least 3 characters long")
      .trim()
      .isLength({ min: 3, max: 50 }),

    body("street", "Street name must be at least 3 characters long")
      .trim()
      .isLength({ min: 3, max: 50 }),

    body(
      "streetNumber",
      "Street number must be between 1 and 10 characters long"
    )
      .trim()
      .isLength({ min: 1, max: 10 }),

    body("postalCode", "Postal code must be between 4 and 10 characters long")
      .trim()
      .isLength({ min: 4, max: 10 }),

    body("sex", "Sex must be either 'male' or 'female'").isIn([
      "male",
      "female",
    ]),

    body("agreedToTerms")
      .isBoolean()
      .withMessage("Agreed to terms must be a boolean")
      .custom((value: boolean) => value === true)
      .withMessage("You must agree to the terms to register"),
  ];
};

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err: ValidationError) => err.msg);

  return res.status(422).json({
    errors: extractedErrors,
  });
};
