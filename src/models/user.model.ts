import mongoose, { Document, Model, Schema } from "mongoose";

export enum UserStatus {
  Verified = "Verified",
  Locked = "Locked",
  NonVerified = "Non-Verified",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  status: UserStatus;
  projectfor: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.NonVerified,
    },
    projectfor: { type: String, required: true, unique: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
