import pkg from 'mongoose'
const { Schema, model, Types } = pkg
import QuizOwnerInfoModel from './QuizOwnerInfoModel.js'
const QuizSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    ownerInfo: QuizOwnerInfoModel,
    title: { type: String, required: true },
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
