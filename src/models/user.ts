import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
    },
    password: { type: String, required: true }, // Consider using bcrypt for hashing
  },
  { timestamps: true, versionKey: false }
);
// delete mongoose.models.User;
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
