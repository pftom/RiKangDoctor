import { delay } from 'redux-saga';
import { put, take, call, fork, cancel, takeEvery } from 'redux-saga/effects';

//import HOSPITAL action constans
import { 
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_ERROR,


  ADD_SINGLE_QUESTION_IMG,
  ADD_SINGLE_QUESTION_IMG_SUCCESS,
  ADD_SINGLE_QUESTION_IMG_ERROR,

  GET_SINGLE_QUESTION,
  GET_SINGLE_QUESTION_SUCCESS,
  GET_SINGLE_QUESTION_ERROR,


  GET_SINGLE_QUESTION_ALL_IMG,
  GET_SINGLE_QUESTION_ALL_IMG_SUCCESS,
  GET_SINGLE_QUESTION_ALL_IMG_ERROR,

  CREATE_SINGLE_QUESTION_ANSWER,
  CREATE_SINGLE_QUESTION_ANSWER_SUCCESS,
  CREATE_SINGLE_QUESTION_ANSWER_ERROR,

  CLEAR_NEW_ANSWER_STATE,

} from '../constants/';

//import request api
import request from '../configs/request';
//import uri config api
import { base, qaApi, qaSingleApi } from '../configs/config';
//  import clear token api
// import { clearItem, setItem } from '../actions/user';


//get the questions list
function* getQuestions(payload) {
  try {
    const { token, refresh, search } = payload;
    let query = (!refresh && payload.query) || null;
    if (search) {
      query = payload.query || null;
      refresh = true;
    }

    const questions = yield call(request.get, base + qaApi.questions, query, token);

    yield put({ type: GET_QUESTIONS_SUCCESS, questions, refresh });
  } catch (error) {
    yield put({ type: GET_QUESTIONS_ERROR });
  }
}


//get single question
function* getSingleQuestion(payload) {
  try {
    const { token, id } = payload;
    const question = yield call(request.get, base + qaSingleApi(id).singleQuestion, null, token);
    yield put({ type: GET_SINGLE_QUESTION_SUCCESS, question });
  } catch (error) {
    yield put({ type: GET_SINGLE_QUESTION_ERROR });
  }
}

function* getSingleQuestionAllImg(payload) {
  try {
    const { token, id } = payload;

    const AllImg = yield call(request.get, base + qaSingleApi(id).singleQuestionAllImg, null, token);

    yield put({ type: GET_SINGLE_QUESTION_ALL_IMG_SUCCESS, AllImg });
  } catch (error) {
    yield put({ type: GET_SINGLE_QUESTION_ALL_IMG_ERROR });
  }
}

function* createSingleQuestionAnswer(payload) {
  try {
    const { token, id, body } = payload;

    yield call(request.post, base + qaSingleApi(id).createSingleQuestionAnswer, body, token );

    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_SUCCESS });
  } catch (error) {
    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_ERROR, error });
  }
}




//HOSPITAL async actions handle function
function* watchGetQuestions() {
  while (true) {
    const { payload } = yield take(GET_QUESTIONS);

    yield call(getQuestions, payload);
  }
}


function* watchGetSingleQuestion() {
  while (true) {
    const { payload } = yield take(GET_SINGLE_QUESTION);
    console.log('payload', payload);
    yield call(getSingleQuestion, payload);
  }
}


function* watchGetSingleQuestionAllImg() {
  while (true) {
    const { payload } = yield take(GET_SINGLE_QUESTION_ALL_IMG);
    yield call(getSingleQuestionAllImg, payload);
  }
}

function* watchCreateSIngleQuestionAnswer() {
  while (true) {
    const { payload } = yield take(CREATE_SINGLE_QUESTION_ANSWER);
    yield call(createSingleQuestionAnswer, payload);
  }
}






export {
  watchGetQuestions,
  watchGetSingleQuestion,
  watchGetSingleQuestionAllImg,
  
  watchCreateSIngleQuestionAnswer,
}