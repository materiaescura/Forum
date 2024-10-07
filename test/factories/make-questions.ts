import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId('any author'),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create('any-title'),
      attachments: new QuestionAttachmentList([]),
      ...override,
    },
    id
  )

  return question
}
