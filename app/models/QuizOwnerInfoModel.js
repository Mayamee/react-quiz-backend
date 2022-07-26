import { Schema, Types } from 'mongoose'

export default new Schema({
  name: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true },
})
