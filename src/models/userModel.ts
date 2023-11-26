// Modules
import mongoose, { Schema, Document } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import validator from "validator";
import { parsePhoneNumberFromString, PhoneNumber } from "libphonenumber-js";
import { getCode } from "country-list";
// Data
import { countreisCodes } from "../data/countriesCodes";

interface IUser extends Document {
  name: string;
  password?: string;
  lastname: string;
  email: string;
  mobilePhone: string;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  sex: "male" | "female";
  agreedToTerms: boolean;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name must be less than 50 characters long"],
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be less than 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (email: string) => {
        return validator.isEmail(email);
      },
      message: "Please provide a valid email address",
    },
  },
  mobilePhone: {
    type: String,
    required: true,
    validate: {
      validator: function (phone: string) {
        const phoneNumber: PhoneNumber | undefined =
          parsePhoneNumberFromString(phone);
        return phoneNumber ? phoneNumber.isValid() : false;
      },
      message: "Provide a valid mobile phone number",
    },
  },
  country: {
    type: String,
    required: [true, "Country is required"],
    validate: {
      validator: (countryName: string): boolean => {
        const countryCode = getCode(countryName);
        return countryCode ? countreisCodes.includes(countryCode) : false;
      },
      message: "Please provide a valid UN member state country name",
    },
  },
  city: {
    type: String,
    required: [true, "City is required"],
    minlength: [3, "City name must be at least 3 characters long"],
    maxlength: [50, "City name must be less than 50 characters long"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
    minlength: [3, "Street name must be at least 3 characters long"],
    maxlength: [50, "Street name must be less than 50 characters long"],
  },
  streetNumber: {
    type: String,
    required: [true, "Street number is required"],
    minlength: [1, "Street number must be at least 1 character long"],
    maxlength: [10, "Street number must be less than 10 characters long"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
    minlength: [4, "Postal code must be at least 4 characters long"],
    maxlength: [10, "Postal code must be less than 10 characters long"],
  },
  sex: {
    type: String,
    required: [true, "Sex is required"],
    enum: {
      values: ["male", "female"],
      message: "Sex must be either 'male' or 'female'",
    },
  },
  agreedToTerms: {
    type: Boolean,
    required: [true, "Agreement to terms is required"],
    default: false,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
