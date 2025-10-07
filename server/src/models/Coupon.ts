import { Schema, model, models, Document } from 'mongoose';

export interface CouponDocument extends Document {
  code: string;
  discountPercent: number;
  validFrom?: Date;
  validTo?: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<CouponDocument>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    discountPercent: { type: Number, required: true, min: 0, max: 100 },
    validFrom: { type: Date },
    validTo: { type: Date },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

couponSchema.index({ code: 1 }, { unique: true });

const Coupon = models.Coupon || model<CouponDocument>('Coupon', couponSchema);
export default Coupon;
