import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements InMemoryQuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []
  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }
  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const items = this.items.filter(
      (itemQuestionAttachment) =>
        !attachments.some((questionAttachment) =>
          questionAttachment.equals(itemQuestionAttachment)
        )
    )

    this.items = items
  }

  async findManyByQuestionId(
    questionId: string
  ): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(
      (questionAttachment) =>
        questionAttachment.questionId.toString() === questionId
    )
    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachments = this.items.filter(
      (attachment) => attachment.questionId.toString() !== questionId
    )

    this.items = questionAttachments
  }
}
