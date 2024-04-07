import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  { timestamps: false, versionKey: false }
);
delete mongoose.models.Newsletter;
const Newsletter =
  mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
