import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteCommnetQuestionUseCase } from './delete-question-comment'
import { makeQuestion } from 'test/factories/make-questions'
import { Question } from '../../enterprise/entities/question'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'

describe('Delete question comment', () => {
  let questionCommentsRepository: InMemoryQuestionCommentsRepository
  let sut: DeleteCommnetQuestionUseCase

  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommnetQuestionUseCase(questionCommentsRepository)
  })

  it('should be able delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    const questionComments: QuestionComment[] = questionCommentsRepository.items

    expect(questionComments).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment()
    await questionCommentsRepository.create(questionComment)

    expect(async () => {
      await sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'non-existent',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
