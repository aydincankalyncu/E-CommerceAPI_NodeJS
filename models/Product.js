import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String,  },
    color: { type: String, },
    price: { type: Number, },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);