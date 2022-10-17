import { Schema, model, Types } from 'mongoose'
import QuizOwnerInfoModel from '../models/QuizOwnerInfoModel'
const QuizSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    ownerInfo: QuizOwnerInfoModel,
    title: { type: String, required: true },
    logoPath: { type: String, required: false, default: null },
    body: [
      {
        id: { type: Number, required: true },
        question: { type: String, required: true },
        rightAnswerId: { type: Number, required: true },
        answers: [
          {
            id: { type: Number, required: true },
            text: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { _id: false }
)

export default model('Quiz', QuizSchema)
