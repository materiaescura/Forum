import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questioncomments: QuestionComment[]
}
export class FetchQuestionCommentsUseCase {
  constructor(private questioncommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questioncomments =
      await this.questioncommentsRepository.findManyByQuestionId(questionId, {
        page,
      })
    return { questioncomments }
  }
}
