import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentAnswerUseCaseRequest {
  answerCommentId: string
  authorId: string
}

interface DeleteCommentAnswerUseCaseResponse {}

export class DeleteCommnetAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}
  async execute({
    answerCommentId,
    authorId,
  }: DeleteCommentAnswerUseCaseRequest): Promise<DeleteCommentAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)
    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
