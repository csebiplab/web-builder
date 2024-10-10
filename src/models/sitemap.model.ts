import mongoose, { Schema, Document } from "mongoose";

export interface ISitemap extends Document {
  projectFor: string;
  changefreq: "yearly" | "monthly" | "weekly";
  loc: string;
  priority: number;
  deletedAt?: Date;
}

const sitemapSchema = new Schema<ISitemap>(
  {
    projectFor: { type: String, required: true },
    changefreq: {
      type: String,
      enum: ["yearly", "monthly", "weekly"],
      required: true,
    },
    loc: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const SitemapModel =
  mongoose.models.Sitemap || mongoose.model<ISitemap>("Sitemap", sitemapSchema);

export default SitemapModel;
