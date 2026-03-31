import mongoose from "mongoose";

const { Schema } = mongoose;

export const requestSchema = new Schema({
  endpoint: { type: String, index: true },
  method: String,
  headers: { type: Map, of: String },
  body: String,
});
