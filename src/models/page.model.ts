import mongoose, { Document, Model, Schema } from "mongoose";

const SectionSchema = new Schema(
  {
    type: { type: String, required: true }, // e.g., 'text', 'h1', 'div', etc.
    content: { type: Schema.Types.Mixed, required: true }, // Flexible content
  },
  { _id: false }
);

const PageSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    sections: [SectionSchema],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

export interface ISection {
  type: string;
  content: any;
}

export interface IPage extends Document {
  title: string;
  slug: string;
  sections: ISection[];
  createdAt: Date;
  updatedAt: Date;
}

const PageModel: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default PageModel;
