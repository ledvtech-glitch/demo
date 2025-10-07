import { Schema, model, models, Document, Types } from 'mongoose';

export interface CartItem {
  product: Types.ObjectId;
  qty: number;
}

export interface CartDocument extends Document {
  user: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<CartDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

const Cart = models.Cart || model<CartDocument>('Cart', cartSchema);
export default Cart;
