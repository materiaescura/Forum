import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswersAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  public async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }
  public async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const newAttachments = this.items.filter(
      (item) => !attachments.find((attachment) => attachment.equals(item))
    )
    this.items = newAttachments
  }
  public async findManyByAnswerId(
    answerId: string
  ): Promise<AnswerAttachment[]> {
    const attachmentsByAnswer = this.items.filter(
      (item) => item.answerId.toString() === answerId
    )
    return attachmentsByAnswer
  }
  public async deleteManyByAnswerId(answerId: string): Promise<void> {
    const newAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId
    )
    this.items = newAttachments
  }
}
