import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteCommnetAnswerUseCase } from './delete-answer-comment'
import { makeAnswer } from 'test/factories/make-answers'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

describe('Delete answer comment', () => {
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let sut: DeleteCommnetAnswerUseCase

  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommnetAnswerUseCase(answerCommentsRepository)
  })

  it('should be able delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await answerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    const answerComments: AnswerComment[] = answerCommentsRepository.items

    expect(answerComments).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment()
    await answerCommentsRepository.create(answerComment)

    expect(async () => {
      await sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'non-existent',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
