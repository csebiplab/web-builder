import mongoose, { Document, Schema, Model } from "mongoose";

export interface IRolePermission extends Document {
  roleId: mongoose.Schema.Types.ObjectId;
  permissionIds: mongoose.Schema.Types.ObjectId[];
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const rolePermissionSchema: Schema<IRolePermission> = new Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      unique: true,
    },
    permissionIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const RolePermissionModel: Model<IRolePermission> =
  mongoose.models.RolePermission ||
  mongoose.model<IRolePermission>("RolePermission", rolePermissionSchema);

export default RolePermissionModel;
