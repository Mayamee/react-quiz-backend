import { ObjectId } from 'mongoose'
import { IQuizBodyItem } from '../services/quiz-service.types'

export interface IQuizDTO {
  id: number
  title: string
  body: IQuizBodyItem[]
  ownerName: string
  ownerId: string
  logoPath: string
}
