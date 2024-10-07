import { InMemoryAnswersAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answers'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

describe('Fetch question answers', () => {
  let inMemoryAnswersAttachmentsRepository: InMemoryAnswersAttachmentsRepository
  let inMemoryAnswersRepository: InMemoryAnswersRepository
  let sut: FetchQuestionAnswersUseCase

  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswersAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })
  it('should be able to fetch question answers', async () => {
    for (let i = 0; i <= 1; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question') })
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question',
      page: 1,
    })

    expect(answers).toHaveLength(2)
    expect(answers).toMatchObject([
      {
        questionId: new UniqueEntityId('question'),
        content: expect.any(String),
      },
      {
        questionId: new UniqueEntityId('question'),
        content: expect.any(String),
      },
    ])
  })

  it('should be able to fetch answers question with pagination', async () => {
    for (let i = 0; i <= 21; i++) {
      inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question') })
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question',
      page: 2,
    })

    expect(answers).toHaveLength(2)
    expect(answers).toMatchObject([
      {
        questionId: new UniqueEntityId('question'),
        content: expect.any(String),
      },
      {
        questionId: new UniqueEntityId('question'),
        content: expect.any(String),
      },
    ])
  })
})
