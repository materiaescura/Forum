import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

describe('Fetch answer comments', () => {
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
  let sut: FetchAnswerCommentsUseCase

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to fetch answer comments', async () => {
    for (let i = 0; i <= 1; i++) {
      inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('author') })
      )
    }

    const { answercomments } = await sut.execute({
      answerId: 'author',
      page: 1,
    })

    expect(answercomments).toHaveLength(2)
    expect(answercomments).toMatchObject([
      { answerId: new UniqueEntityId('author'), content: expect.any(String) },
      { answerId: new UniqueEntityId('author'), content: expect.any(String) },
    ])
  })

  it('should be able to fetch answer comments with pagination', async () => {
    for (let i = 0; i <= 21; i++) {
      inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('author') })
      )
    }

    const { answercomments } = await sut.execute({
      answerId: 'author',
      page: 2,
    })

    expect(answercomments).toHaveLength(2)
    expect(answercomments).toMatchObject([
      { answerId: new UniqueEntityId('author'), content: expect.any(String) },
      { answerId: new UniqueEntityId('author'), content: expect.any(String) },
    ])
  })
})
