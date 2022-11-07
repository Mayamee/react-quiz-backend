import { IQuizDTO } from '../types/dtos/quiz-dto.types'
import { IQuizBodyItem } from '../types/services/quiz-service.types'

export default class QuizDTO implements IQuizDTO {
  constructor(data: any) {
    this.id = data._id
    this.title = data.title
    this.body = data.body
    this.ownerName = data.ownerInfo.name
    this.ownerId = data.ownerInfo.userId
    this.logoPath = data.logoPath
  }
  id: number
  title: string
  body: IQuizBodyItem[]
  ownerName: string
  ownerId: string
  logoPath: string
}
