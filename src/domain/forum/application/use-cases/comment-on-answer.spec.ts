import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from 'test/factories/make-answers'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

describe('Comment on answer', () => {
  let answerAttachmentsRepository: InMemoryAnswersAttachmentsRepository
  let answerRepository: InMemoryAnswersRepository
  let answerCommentsRepository: InMemoryAnswerCommentsRepository
  let sut: CommentOnAnswerUseCase

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswersAttachmentsRepository()
    answerRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository
    )
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new CommentOnAnswerUseCase(answerRepository, answerCommentsRepository)
  })

  it('should be able comment on answer', async () => {
    const answer = makeAnswer()
    await answerRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'any content',
    })

    const comment: AnswerComment = answerCommentsRepository.items[0]

    expect(comment).toMatchObject({
      authorId: answer.authorId,
      answerId: answer.id,
      content: 'any content',
    })
  })
})
