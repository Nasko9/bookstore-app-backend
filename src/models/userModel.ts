import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// Todo: Expand user model with more data
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
