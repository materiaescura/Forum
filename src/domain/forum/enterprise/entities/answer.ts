import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { AnswerAttachmentList } from './answer-attachment-list'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  attachments: AnswerAttachmentList
  createAt: Date
  updateAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get authorId() {
    return this.props.authorId
  }

  get createAt() {
    return this.props.createAt
  }

  get updateAt() {
    return this.props.updateAt
  }

  get questionId() {
    return this.props.questionId
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
  }

  touch() {
    this.props.updateAt = new Date()
  }

  get excerpt() {
    return this.props.content.substring(0, 120).trimEnd().concat('...')
  }

  static create(
    props: Optional<AnswerProps, 'createAt' | 'attachments'>,
    id?: UniqueEntityId
  ) {
    const answer = new Answer(
      {
        ...props,
        attachments: props.attachments ?? new AnswerAttachmentList(),
        createAt: props.createAt ?? new Date(),
      },
      id
    )
    return answer
  }
}
