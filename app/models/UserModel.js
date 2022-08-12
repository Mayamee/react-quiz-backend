import pkg from "mongoose";
const { Schema, model } = pkg;

const UserShema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activated: { type: Boolean, default: false },
  activationLink: { type: String },
});

export default model("User", UserShema);
