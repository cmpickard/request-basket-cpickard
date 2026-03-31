import mongoose from "mongoose";
import { connectPostgres } from "./pgModel";

export async function connectDBs() {
  await connectMongo();
  await connectPostgres();
}

async function connectMongo() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) throw new Error('MONGO_URI not set in .env');

  await mongoose.connect(mongoURI);
  console.log('MongoDB connected');

  mongoose.connection.on('error', (e) => console.error('MongoDB error:', e));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'));
}
