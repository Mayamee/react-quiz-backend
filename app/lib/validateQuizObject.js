import ApiError from "../error/ApiError.js";

export default function validateQuizObject(quizObject) {
  const { title, body } = quizObject;
  if (!title) {
    throw ApiError.ValidationError("No title provided");
  }
  if (title.length > 50) {
    throw ApiError.ValidationError("Title is too long");
  }
  if (!body) {
    throw ApiError.ValidationError("No body provided");
  }
  if (!Array.isArray(body)) {
    throw ApiError.ValidationError("Body must be an array");
  }
  if (body.length === 0) {
    throw ApiError.ValidationError("Body must not be empty");
  }
  body.forEach((question) => {
    if (!question.id) {
      throw ApiError.ValidationError("Question id is required");
    }
    if (!question.question) {
      throw ApiError.ValidationError("Question text is required");
    }
    if (!question.rightAnswerId) {
      throw ApiError.ValidationError("Right answer id is required");
    }
    if (!question.answers) {
      throw ApiError.ValidationError("Answers are required");
    }
    if (!Array.isArray(question.answers)) {
      throw ApiError.ValidationError("Answers must be an array");
    }
    if (question.answers.length === 0) {
      throw ApiError.ValidationError("Answers must not be empty");
    }
    question.answers.forEach((answer) => {
      if (!answer.text) {
        throw ApiError.ValidationError("Answer text is required");
      }
      if (!answer.id) {
        throw ApiError.ValidationError("Answer id is required");
      }
    });
  });
}
