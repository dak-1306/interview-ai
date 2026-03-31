import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  role: {
    type: String,
    default: "user"
  }
});

export const User =
  mongoose.models.User || mongoose.model("User", UserSchema);