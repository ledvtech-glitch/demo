import { Schema, model, models, Document } from 'mongoose';

export type UserRole = 'customer' | 'admin' | 'vendor';

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'vendor'], default: 'customer', index: true },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

const User = models.User || model<UserDocument>('User', userSchema);
export default User;
