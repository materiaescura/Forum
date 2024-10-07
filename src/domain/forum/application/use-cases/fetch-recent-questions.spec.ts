import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-questions'

describe('Fetch recent questions', () => {
  let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: FetchRecentQuestionsUseCase

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to fetch recent questions with pagination', async () => {
    for (let i = 1; i <= 23; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({ createAt: new Date(2024, 0, i) })
      )
    }
    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(3)
    expect(questions).toEqual([
      expect.objectContaining({ createAt: new Date(2024, 0, 3) }),
      expect.objectContaining({ createAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createAt: new Date(2024, 0, 1) }),
    ])
  })
})
