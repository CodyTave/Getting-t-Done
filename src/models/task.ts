import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["notStarted", "inProgress", "completed"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

delete mongoose.models.Task;
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
