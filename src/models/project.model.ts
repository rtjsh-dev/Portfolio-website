import mongoose, { Model } from "mongoose";

export interface IProject {
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  categories: string[];
}

const ProjectSchema = new mongoose.Schema<IProject>({
  order: { type: Number, required: true, default: 0 },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  categories: { type: [String], default: [] },
});


const Project: Model<IProject> =
  (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
