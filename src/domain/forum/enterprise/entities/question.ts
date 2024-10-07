import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Slug } from './value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionAttachmentList } from './question-attachment-list'

export interface QuestionProps {
  title: string
  content: string
  slug: Slug
  bestAnswerId?: UniqueEntityId
  authorId: UniqueEntityId
  attachments: QuestionAttachmentList
  createAt: Date
  updateAt?: Date
}
export class Question extends AggregateRoot<QuestionProps> {
  get title() {
    return this.props.title
  }
  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
  }

  get content() {
    return this.props.content
  }
  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return String(this.props.slug)
  }

  get bestAnswerId(): any {
    return this.props.bestAnswerId
  }

  set bestAnswerId(id: UniqueEntityId) {
    this.props.bestAnswerId = id
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get createAt() {
    return this.props.createAt
  }

  get updateAt(): any {
    return this.props.updateAt
  }

  get isNew() {
    return dayjs().diff(this.props.createAt, 'days') < 3
  }

  touch() {
    this.props.updateAt = new Date()
  }

  static create(
    props: Optional<QuestionProps, 'createAt' | 'slug'>,
    id?: UniqueEntityId
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createAt: props.createAt ?? new Date(),
        attachments: props.attachments ?? new QuestionAttachmentList(),
      },
      id
    )
    return question
  }
}
