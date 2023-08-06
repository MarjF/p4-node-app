import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  date_created: { type: Date, required: true, default: Date.now },
  date_updated: { type: Date, required: true, default: Date.now },
  logs: { type: String, required: false },
  isLoggedin: { type: Boolean, required: true, default: false },
});

const User = model("user", userSchema);

export default User;
