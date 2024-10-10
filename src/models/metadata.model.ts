import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IMetaData extends Document {
  projectFor: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string;
  pageLink?: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const metaDataSchema = new Schema<IMetaData>(
  {
    projectFor: { type: String, required: true },
    pageName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    keywords: { type: String },
    pageLink: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const MetaDataModel: Model<IMetaData> =
  models?.Metadata || mongoose.model<IMetaData>("Metadata", metaDataSchema);

export default MetaDataModel;
