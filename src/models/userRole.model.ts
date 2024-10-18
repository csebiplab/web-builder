import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserRole extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  roleId: mongoose.Schema.Types.ObjectId;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userRoleSchema: Schema<IUserRole> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const UserRoleModel: Model<IUserRole> =
  mongoose.models.UserRole ||
  mongoose.model<IUserRole>("UserRole", userRoleSchema);

export default UserRoleModel;
