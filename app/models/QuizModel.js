import pkg from "mongoose";
const { Schema, model } = pkg;

const QuizSchema = new Schema({
  title: { type: String, required: true },
  uuid: { type: String, required: true },
  body: [
    {
      id: { type: Number, required: true, unique: true },
      question: { type: String, required: true },
      rightAnswerId: { type: Number, required: true },
      answers: [
        {
          id: { type: Number, required: true, unique: true },
          text: { type: String, required: true },
        },
      ],
    },
  ],
});

export default model("Quiz", QuizSchema);
