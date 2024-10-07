import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(private attachmentsRepository: AnswerAttachmentsRepository) {}

  async create(answer: Answer) {
    this.items.push(answer)
    await this.attachmentsRepository.createMany(answer.attachments.getItems())
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answerId)
    return answer ?? null
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return answers
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    )
    this.items.splice(index, 1)

    await this.attachmentsRepository.deleteManyByAnswerId(answer.id.toString())
  }

  async save(answer: Answer): Promise<Answer> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === answer.id.toString()
    )
    this.items[index] = answer

    await this.attachmentsRepository.createMany(
      answer.attachments.getNewItems()
    )
    await this.attachmentsRepository.deleteMany(
      answer.attachments.getRemovedItems()
    )
    return answer
  }
}
