import { delay } from 'redux-saga';
import { put, take, call } from 'redux-saga/effects';

//import POSTS action constans
import { 
  GET_SINGLE_QUESTION_ALL_ANSWERS,
  GET_SINGLE_QUESTION_ALL_ANSWERS_SUCCESS,
  GET_SINGLE_QUESTION_ALL_ANSWERS_ERROR,

  CREATE_SINGLE_QUESTION_ANSWER,
  CREATE_SINGLE_QUESTION_ANSWER_SUCCESS,
  CREATE_SINGLE_QUESTION_ANSWER_ERROR,

  GET_SINGLE_QUESTION_ANSWER,
  GET_SINGLE_QUESTION_ANSWER_SUCCESS,
  GET_SINGLE_QUESTION_ANSWER_ERROR,

  UPVOTE_SINGLE_QUESTION_ANSWER,
  UPVOTE_SINGLE_QUESTION_ANSWER_SUCCESS,
  UPVOTE_SINGLE_QUESTION_ANSWER_ERROR,

  GET_SINGLE_ANSWER_ALL_COMMENTS,
  GET_SINGLE_ANSWER_ALL_COMMENTS_SUCCESS,
  GET_SINGLE_ANSWER_ALL_COMMENTS_ERROR,

  CREATE_SINGLE_QUESTION_ANSWER_COMMENT,
  CREATE_SINGLE_QUESTION_ANSWER_COMMENT_SUCCESS,
  CREATE_SINGLE_QUESTION_ANSWER_COMMENT_ERROR,

  CLEAR_COMMENT,
  CLEAR_COMMENT_STATE,
} from '../constants/';

//import request api
import request from '../configs/request';
//import uri config api
import { base, qaApi, qaSingleApi } from '../configs/config';
//  import clear token api
// import { clearItem, setItem } from '../actions/user';


function* getSingleQuestionAllAnswer(payload) {
  try {

    //get token for authorization and id for api
    const { id, token, refresh } = payload;
    const query = (!refresh && payload.query) || null;
    //get http request for allAnswers, the follow code are as same format
    const answers = yield call(request.get, base + qaSingleApi(id).singleQuestionAnswer, query, token);
    yield put({ type: GET_SINGLE_QUESTION_ALL_ANSWERS_SUCCESS, answers, refresh });
  } catch (error) {
    yield put({ type: GET_SINGLE_QUESTION_ALL_ANSWERS_ERROR });
  }
}

function* createAnswerForSingleQuestion(payload) {
  try {
    const { id, token, body } = payload;
    const createdAnswer = yield call(request.post, base + qaSingleApi(id).createSingleQuestionAnswer, body, token);
    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_SUCCESS });
  } catch (error) {
    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_ERROR });
  }
}


function* getSingleAnswer(payload) {
  try {
    const { id, token } = payload;
    const answer = yield call(request.get, base + qaSingleApi(id).singleAnswer, null, token);
    yield put({ type: GET_SINGLE_QUESTION_ANSWER_SUCCESS, answer });
  } catch (error) {
    yield put({ type: GET_SINGLE_QUESTION_ANSWER_ERROR });
  }
}

function* upvoteSingleAnswer(payload) {
  try {
    const { id, token } = payload;
    const upvotedAnswer = yield call(request.get, base + qaSingleApi(id).singleAnswerUpvote, null, token);
    yield put({ type: UPVOTE_SINGLE_QUESTION_ANSWER_SUCCESS, upvotedAnswer });
  } catch (error) {
    yield put({ type: UPVOTE_SINGLE_QUESTION_ANSWER_ERROR });
  }
}

function* getSingleAnswerAllComments(payload) {
  try {
    const { token, refresh, id } = payload;
    const query = (!refresh && payload.query) || null;
    //emit http get, fetch  doctors 
    const singleAnswerAllComments = yield call(request.get, base + qaSingleApi(id).singleAnswerAllComments, query, token);
    yield put({ type: GET_SINGLE_ANSWER_ALL_COMMENTS_SUCCESS, singleAnswerAllComments, refresh });
  } catch (error) {
    yield put({ type: GET_SINGLE_ANSWER_ALL_COMMENTS_ERROR });
  }
}

function* createSingleAnswerComment(payload) {
  try {
    const { id, token, body } = payload;
    yield call(request.post, base + qaSingleApi(id).addSingleAnswerComments, body, token);
    //make a delay for js thread debounce
    yield delay(500);
    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_COMMENT_SUCCESS });
    yield delay(500);
    yield put({ type: GET_SINGLE_ANSWER_ALL_COMMENTS, payload: { token, id, refresh: true }})
  } catch (error) {
    yield put({ type: CREATE_SINGLE_QUESTION_ANSWER_COMMENT_ERROR });
  }
}



//POSTS async actions watch function
function* watchGetSingleQuestionAllAnswers() {
  while (true) {
    const { payload } = yield take(GET_SINGLE_QUESTION_ALL_ANSWERS);
    // fork return a Task object for cancel later
    yield call(getSingleQuestionAllAnswer, payload);
  }
}

function* watchCreateSingleQuestionAnswer() {
  while (true) {
    const { payload } = yield take(CREATE_SINGLE_QUESTION_ANSWER);
    // fork return a Task object for cancel later
    yield call(createAnswerForSingleQuestion, payload);
  }
}

function* watchGetSingleQuestionAnswer() {
  while (true) {
    const { payload } = yield take(GET_SINGLE_QUESTION_ANSWER);
    // fork return a Task object for cancel later
    yield call(getSingleAnswer, payload);
  }
}

function* watchUpvoteSingleQuestionAnswer() {
  while (true) {
    const { payload } = yield take(UPVOTE_SINGLE_QUESTION_ANSWER);
    // fork return a Task object for cancel later
    yield call(upvoteSingleAnswer, payload);
  }
}

function* watchGetAnswerAllComments() {
  while (true) {
    const { payload } = yield take(GET_SINGLE_ANSWER_ALL_COMMENTS);
    // fork return a Task object for cancel later
    yield call(getSingleAnswerAllComments, payload);
  }
}

function* watchCreateSingleQuestionAnswerComment() {
  while (true) {
    const { payload } = yield take(CREATE_SINGLE_QUESTION_ANSWER_COMMENT);
    // fork return a Task object for cancel later
    yield call(createSingleAnswerComment, payload);
  }
}

function* watchClearCommentState() {
  while (true) {
     yield take(CLEAR_COMMENT);
    yield delay(1000);
    yield put({ type: CLEAR_COMMENT_STATE });
  }
}




export {
  watchGetSingleQuestionAllAnswers,
  watchCreateSingleQuestionAnswer,
  watchGetSingleQuestionAnswer,
  watchUpvoteSingleQuestionAnswer,
  watchGetAnswerAllComments,
  watchCreateSingleQuestionAnswerComment,
  watchClearCommentState,
}