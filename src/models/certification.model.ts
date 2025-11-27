import mongoose, { Document, Model } from "mongoose";

export interface ICertification extends Document {
  title: string;
  link: string;
  imageUrl: string;
  categories: string[];
  issuedDate: Date;
}

const CertificationSchema = new mongoose.Schema<ICertification>({
  title: { 
    type: String, 
    required: true 
  },
  link: { 
    type: String, 
    required: true 
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  categories: { 
    type: [String], 
    default: [] 
  },
  issuedDate: { 
    type: Date, 
    required: true 
  },
});

export const Certification: Model<ICertification> =
  mongoose.models.Certification ||
  mongoose.model<ICertification>("Certification", CertificationSchema);
