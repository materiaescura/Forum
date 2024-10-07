import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {
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

  get answerId() {
    return this.props.answerId
  }

  touch() {
    this.props.updateAt = new Date()
  }

  static create(
    props: Optional<AnswerCommentProps, 'createAt'>,
    id?: UniqueEntityId
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createAt: props.createAt ?? new Date(),
      },
      id
    )

    return answerComment
  }
}
