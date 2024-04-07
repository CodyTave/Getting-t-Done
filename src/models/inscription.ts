import mongoose from "mongoose";

const inscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    isEntreprise: {
      type: Boolean,
      required: true,
    },
    enterpriseName: {
      type: String,
      required: false,
    },
    formation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Formation",
      required: [true, "Please specify the formation"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Inscription =
  mongoose.models.Inscription ||
  mongoose.model("Inscription", inscriptionSchema);

export default Inscription;
