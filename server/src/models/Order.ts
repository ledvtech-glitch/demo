import { Schema, model, models, Document, Types } from 'mongoose';

export interface OrderItem {
  product: Types.ObjectId;
  qty: number;
  price: number;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
      },
    ],
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });

const Order = models.Order || model<OrderDocument>('Order', orderSchema);
export default Order;
