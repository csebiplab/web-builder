import mongoose, { Document, Model, Schema } from "mongoose";

// Define the status types as an enum
export enum UserStatus {
  Verified = "Verified",
  Locked = "Locked",
  NonVerified = "Non-Verified",
}

// Extend the IUser interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  status: UserStatus;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
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
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

// Create and export the UserModel
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
