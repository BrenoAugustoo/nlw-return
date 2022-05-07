import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail:  sendMailSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () =>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,h82h18e1yedjhwabdhjasdhj'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should be not able to submit a feedback without type', async () =>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,h82h18e1yedjhwabdhjasdhj'
    })).rejects.toThrow()
  });

  it('should be not able to submit a feedback without comment', async () =>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,h82h18e1yedjhwabdhjasdhj'
    })).rejects.toThrow()
  });

  it('should be not able to submit a feedback an invalid screenshot', async () =>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado',
      screenshot: '123'
    })).rejects.toThrow()
  });
});