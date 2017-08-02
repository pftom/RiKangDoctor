import { createSelector } from 'reselect';

//import get token common select
import { getToken } from './commonSelector';


const getQuestions = (state) => state.getIn(['qa', 'questions']);
const getQuestionStarredFav = (state) => state.getIn(['patient', 'questionStarredFav']);
const getMyQuestions = (state) => state.getIn(['patient', 'questionFav']);

const getUserId = (state) => state.getIn(['auth', 'id']);
const getDoctorAnswers = (state) => state.getIn(['doctor', 'answers']);

const getQaSelector = createSelector(
  [ getToken, getQuestions, getQuestionStarredFav, getMyQuestions, getUserId, getDoctorAnswers ],
  (token, questions, questionStarredFav, questionFav, userId, answers ) => {
      return {
      token,
      questions,
      questionStarredFav,
      questionFav,
      userId,
      answers,
    }
  }
);

const getQuestion = (state) => state.getIn(['qa', 'question']);
const getQuestionAllImg = (state) => state.getIn(['qa', 'AllImg']);
const getAnswers = (state) => state.getIn(['answer', 'answers']);

const getSingleQaSelector = createSelector(
  [ getUserId, getQuestion, getQuestionAllImg, getAnswers, getQuestionStarredFav ],
  ( userId, question, AllImg, answers, questionStarredFav) => ({
    userId,
    question,
    AllImg,
    answers,
    questionStarredFav,
  }),
);

const getIsCreateAnswer = (state) => state.getIn(['qa', 'isCreateAnswer']);
const getCreateAnswerSuccess = (state) => state.getIn(['qa', 'createAnswerSuccess']);
const getCreateAnswerError = (state) => state.getIn(['qa', 'createAnswerError']);

const getCreateAnswerSelector = createSelector(
  [ getIsCreateAnswer, getCreateAnswerSuccess, getCreateAnswerError ],
  (isCreateAnswer, createAnswerSuccess, createAnswerError) => ({
    isCreateAnswer,
    createAnswerSuccess,
    createAnswerError,
  })
);

export {
  getQaSelector,
  getSingleQaSelector,
  getCreateAnswerSelector,
}
