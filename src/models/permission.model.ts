import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPermission extends Document {
  permissionName: string;
  description: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema: Schema<IPermission> = new Schema(
  {
    permissionName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const PermissionModel: Model<IPermission> =
  mongoose.models.Permission ||
  mongoose.model<IPermission>("Permission", permissionSchema);

export default PermissionModel;
