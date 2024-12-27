import mongoose from "mongoose";

const ElementSchema = new mongoose.Schema({
  type: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  content: { type: String },
});

const LayoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  elements: [ElementSchema],
});

const LayoutModel =
  mongoose.models.Layout || mongoose.model("Layout", LayoutSchema);

export default LayoutModel;
