import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false }, // URL to the image
  },
  { timestamps: true, versionKey: false }
);
// delete mongoose.models.Category;
const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
