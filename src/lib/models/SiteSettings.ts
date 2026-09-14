import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettings extends Document {
  hero: boolean;
  about: boolean;
  services: boolean;
  whyChooseUs: boolean;
  contact: boolean;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  hero: {
    type: Boolean,
    default: true,
  },
  about: {
    type: Boolean,
    default: true,
  },
  services: {
    type: Boolean,
    default: true,
  },
  whyChooseUs: {
    type: Boolean,
    default: true,
  },
  contact: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
