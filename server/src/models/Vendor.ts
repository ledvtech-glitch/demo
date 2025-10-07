import { Schema, model, models, Document } from 'mongoose';

export interface VendorDocument extends Document {
  name: string;
  slug: string;
  description?: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new Schema<VendorDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    approved: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

vendorSchema.index({ slug: 1 }, { unique: true });

const Vendor = models.Vendor || model<VendorDocument>('Vendor', vendorSchema);
export default Vendor;
