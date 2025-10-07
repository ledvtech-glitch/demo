import { Schema, model, models, Document, Types } from 'mongoose';

export interface AffiliateDocument extends Document {
  code: string;
  user: Types.ObjectId;
  commissionPercent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const affiliateSchema = new Schema<AffiliateDocument>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    commissionPercent: { type: Number, required: true, min: 0, max: 100 },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

affiliateSchema.index({ code: 1 }, { unique: true });

const Affiliate = models.Affiliate || model<AffiliateDocument>('Affiliate', affiliateSchema);
export default Affiliate;
