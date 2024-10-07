import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    const comment = this.items.find(
      (item) => item.id.toString() === questionCommentId
    )
    return comment ?? null
  }
  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<QuestionComment[]> {
    const comments = this.items
      .filter((comment) => comment.questionId.toString() === questionId)
      .slice((page - 1) * 20, 20 * page)

    return comments
  }
  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === questionComment.id.toString()
    )
    this.items.splice(index, 1)
  }
}
