import pkg from 'mongoose'
const { Schema, Types } = pkg

export default new Schema({
  name: { type: String, required: true },
  userId: { type: Types.ObjectId, required: true },
})
