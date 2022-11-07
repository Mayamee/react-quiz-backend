interface IQuizAnswerBodyItem {
  id: number
  text: string
}
export interface IQuizBodyItem {
  id: number
  question: string
  rightAnswerId: number
  answers: IQuizAnswerBodyItem[]
}
export interface IDataQuiz {
  quizTitle: string
  quizBody: IQuizBodyItem[]
  quizOwnerInfo: {
    userId: string
    name: string
  }
  logoPath: string | null
}