import pkg from "mongoose";
const { Schema, model, Types } = pkg;

const TokenSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  accessToken: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true },
});
export default model("Token", TokenSchema);
