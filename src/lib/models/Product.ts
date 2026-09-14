import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: "freight" | "customs" | "warehouse" | "specialized" | "other";
  description: string;
  features: string[];
  specifications: {
    material?: string;
    size?: string;
    finish?: string;
    quantity?: string;
  };
  isActive: boolean;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Please add a product name"],
    trim: true,
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  category: {
    type: String,
    required: [true, "Please add a category"],
    enum: ["freight", "customs", "warehouse", "specialized", "other"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  specifications: {
    material: String,
    size: String,
    finish: String,
    quantity: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
