import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteVerification extends Document {
  projectFor: string;
  title: string;
  url: string;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const siteVerificationSchema = new Schema<ISiteVerification>(
  {
    projectFor: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const SiteVerificationModel: Model<ISiteVerification> =
  mongoose.models.SiteVerification ||
  mongoose.model<ISiteVerification>("SiteVerification", siteVerificationSchema);

export default SiteVerificationModel;
