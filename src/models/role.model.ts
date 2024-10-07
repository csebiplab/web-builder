import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRole extends Document {
  rolename: string;
  description: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema: Schema<IRole> = new Schema(
  {
    rolename: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const RoleModel: Model<IRole> =
  mongoose.models.Role || mongoose.model<IRole>("Role", roleSchema);

export default RoleModel;
