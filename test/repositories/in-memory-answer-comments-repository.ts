import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
    const comment = this.items.find(
      (item) => item.id.toString() === answerCommentId
    )
    return comment ?? null
  }
  async findManyByAnswerId(
    answerId: string,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    const comments = this.items
      .filter((comment) => comment.answerId.toString() === answerId)
      .slice((page - 1) * 20, 20 * page)

    return comments
  }
  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answerComment.id.toString()
    )
    this.items.splice(index, 1)
  }
}
