import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  product?: string;
  service: string;
  cargoType?: string;
  message: string;
  status: "pending" | "contacted" | "closed";
  notes?: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  name: {
    type: String,
    required: [true, "Please add your name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please add your email"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  company: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  product: {
    type: String,
  },
  service: {
    type: String,
    required: [true, "Please select a service"],
  },
  cargoType: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Please add a message"],
    maxlength: [2000, "Message cannot be more than 2000 characters"],
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "closed"],
    default: "pending",
  },
  notes: {
    type: String,
    maxlength: [1000, "Notes cannot be more than 1000 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
