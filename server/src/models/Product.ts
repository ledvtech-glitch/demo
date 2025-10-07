import { Schema, model, models, Document } from 'mongoose';

export interface ProductDocument extends Document {
  title: string;
  slug: string;
  price: number;
  stock: number;
  category?: string;
  brand?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, index: true },
    brand: { type: String, index: true },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

productSchema.index({ slug: 1 }, { unique: true });
productSchema.index({ title: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });

const Product = models.Product || model<ProductDocument>('Product', productSchema);
export default Product;
