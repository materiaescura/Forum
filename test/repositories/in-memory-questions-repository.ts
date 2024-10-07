import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async create(question: Question) {
    this.items.push(question)

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems()
    )
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug === slug)
    return question ?? null
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = this.items.find(
      (item) => item.id.toString() === questionId
    )
    return question ?? null
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString()
    )
    this.items.splice(index, 1)
    await this.questionAttachmentsRepository.deleteManyByQuestionId(
      question.id.toString()
    )
  }

  async save(question: Question): Promise<Question> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === question.id.toString()
    )
    this.items[index] = question

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getNewItems()
    )
    await this.questionAttachmentsRepository.deleteMany(
      question.attachments.getRemovedItems()
    )
    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createAt.getTime() - a.createAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }
}
