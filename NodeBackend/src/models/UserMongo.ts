import mongoose, { Document, Schema } from 'mongoose';

export interface UserMongoDocument extends Document {
  userId: number;
  indexId: string[];
  images: string[];
}

const userMongoSchema = new Schema<UserMongoDocument>({
  userId: { type: Number, required: true, unique: true },
  indexId: { type: [String], required: true },
  images: { type: [String], required: true },
});

export const UserMongoModel = mongoose.model<UserMongoDocument>(
  'UserMongo',
  userMongoSchema,
);
