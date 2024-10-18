import mongoose, { Schema, Document } from "mongoose";

export interface IRobotTxt extends Document {
  projectFor: string;
  sitemap_url: string;
  user_agent: string;
  allow: string;
  disallow: string;
  deletedAt?: Date;
}

const robotSchema = new Schema<IRobotTxt>(
  {
    projectFor: { type: String, required: true },
    sitemap_url: { type: String, required: true },
    user_agent: { type: String, required: true },
    allow: { type: String, required: true },
    disallow: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const RobotTxtModel =
  mongoose.models.RobotTxt ||
  mongoose.model<IRobotTxt>("RobotTxt", robotSchema);
export default RobotTxtModel;
