import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlug } from './get-question-by-slug'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-questions'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlug

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    )
    sut = new GetQuestionBySlug(inMemoryQuestionsRepository)
  })

  it('should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('any-title') })
    inMemoryQuestionsRepository.create(newQuestion)
    const { question } = await sut.execute({
      slug: 'any-title',
    })

    expect(question.id).toBeTruthy()
  })
})
