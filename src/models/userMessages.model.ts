import mongoose, { Schema, Document, Model, models } from "mongoose";

export interface IUserMessage extends Document {
  projectFor: string;
  name: string;
  email: string;
  message: string;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IUserMessage>(
  {
    projectFor: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const MessageModel: Model<IUserMessage> =
  models?.userMessage ||
  mongoose.model<IUserMessage>("userMessage", messageSchema);

export default MessageModel;
