import mongoose, { Document, Model, Schema } from "mongoose";

// Enums for projectType
export enum ProjectTypeEnum {
  INTERIOR = "Interior",
  EXTERIOR = "Exterior",
}

export interface IThumbPic {
  name: string;
  url: string;
}

export interface IProjectPicture {
  projectPeriod: string;
  urls: IThumbPic[];
}

export interface IProject extends Document {
  projectFor: string;
  projectType: ProjectTypeEnum;
  projectCat: string;
  projectCatHeading: string;
  projectName: string;
  thumbPic: IThumbPic;
  projectPictures: IProjectPicture[];
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const thumbPicSchema: Schema<IThumbPic> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const projectPictureSchema: Schema<IProjectPicture> = new Schema(
  {
    projectPeriod: {
      type: String,
      required: true,
    },
    urls: [thumbPicSchema],
  },
  { _id: false }
);

const projectSchema: Schema<IProject> = new Schema(
  {
    projectFor: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      enum: Object.values(ProjectTypeEnum),
      required: true,
    },
    projectCat: {
      type: String,
      required: true,
    },
    projectCatHeading: {
      type: String,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    thumbPic: {
      type: thumbPicSchema,
      required: true,
    },
    projectPictures: [projectPictureSchema],
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

const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default ProjectModel;
