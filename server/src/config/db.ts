import mongoose from 'mongoose';

export async function connectToDatabase(connectionUri?: string): Promise<typeof mongoose> {
  const uri = connectionUri ?? process.env.MONGODB_URI ?? 'mongodb://localhost:27017/megamart';
  mongoose.set('strictQuery', true);
  return mongoose.connect(uri);
}
