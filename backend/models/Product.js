import { Schema, model } from "mongoose";

const productSchema = new Schema({
  image: { type: String, required: false },
  name: { type: String, required: true },
  brandname: { type: String, required: true },
  quantity: { type: Number, required: true },
  units: { type: String, required: true },
  description: { type: String, required: false },
  active: { type: Boolean, required: true, default: false },
  date_created: { type: Date, required: true, default: Date.now },
  date_updated: { type: Date, required: true, default: Date.now },
  logs: { type: String, required: false },
});

const Product = model("product", productSchema);

export default Product;
