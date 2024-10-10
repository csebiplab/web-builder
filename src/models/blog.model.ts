import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  projectFor: string;
  blogTitle: string;
  metaTitle: string;
  customLink: string;
  metaDescription: string;
  metaKeywords: string;
  shortDescription: string;
  content: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new Schema(
  {
    projectFor: {
      type: String,
      required: true,
    },
    blogTitle: {
      type: String,
      required: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    customLink: {
      type: String,
      required: true,
      unique: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    metaKeywords: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default BlogModel;
