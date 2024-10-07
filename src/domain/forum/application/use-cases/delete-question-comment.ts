import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteCommentQuestionUseCaseRequest {
  questionCommentId: string
  authorId: string
}

interface DeleteCommentQuestionUseCaseResponse {}

export class DeleteCommnetQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}
  async execute({
    questionCommentId,
    authorId,
  }: DeleteCommentQuestionUseCaseRequest): Promise<DeleteCommentQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(questionCommentId)
    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed')
    }

    await this.questionCommentsRepository.delete(questionComment)

    return {}
  }
}
