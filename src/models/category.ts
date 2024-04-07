import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL to the image
  },
  { timestamps: true, versionKey: false }
);
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
