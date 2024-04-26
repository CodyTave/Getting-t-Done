import mongoose from "mongoose";

const Schema = mongoose.Schema;

const programSchema = new Schema({
  title: { type: String, required: true },
  parts: [{ type: String }],
});

const formationSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false }, // URL to the image
    objectifs: { type: String, required: true },
    target: { type: String, required: true },
    prerequisite: { type: String, required: true },
    pedagogy: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: false },
    program: [programSchema],
    category: { type: Schema.Types.ObjectId, ref: "Category" }, // Reference to Category model
  },
  { timestamps: true, versionKey: false }
);
//delete mongoose.models.Formation;

const Formation =
  mongoose.models.Formation || mongoose.model("Formation", formationSchema);
export default Formation;
