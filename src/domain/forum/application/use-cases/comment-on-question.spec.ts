import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from 'test/factories/make-questions'
import { QuestionComment } from '../../enterprise/entities/question-comment'

describe('Comment on question', () => {
  let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
  let questionRepository: InMemoryQuestionsRepository
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let sut: CommentOnQuestionUseCase

  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository
    )
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      questionRepository,
      questionCommentsRepository
    )
  })

  it('should be able comment on question', async () => {
    const question = makeQuestion()
    await questionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'any content',
    })

    const comment: QuestionComment = questionCommentsRepository.items[0]

    expect(comment).toMatchObject({
      authorId: question.authorId,
      questionId: question.id,
      content: 'any content',
    })
  })
})
