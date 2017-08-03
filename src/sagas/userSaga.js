import { delay } from 'redux-saga';
import { put, take, select, call, fork, cancel, cancelled } from 'redux-saga/effects';

//import LOGIN action constans
import { 
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,

  REGISTER_SEND_MESSAGE,
  REGISTER_SEND_MESSAGE_ERROR,
  REGISTER_SEND_MESSAGE_SUCCESS,

  REQUEST_SMS_CODE,
  REQUEST_SMS_CODE_SUCCESS,
  REQUEST_SMS_CODE_ERROR,

  LOGIN,  
  LOGIN_SUCCESS, 
  LOGIN_ERROR, 

  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,

  LOGOUT, 

  CLEAR_TOKEN, 
  SET_TOKEN,

  CLEAR,
  CLEAR_STATE,

  FEEDBACK,
  FEEDBACK_SUCCESS,
  FEEDBACK_ERROR,

  SUBMIT_VERIFY_DATA,
  SUBMIT_VERIFY_DATA_SUCCESS,
  SUBMIT_VERIFY_DATA_ERROR,
} from '../constants/';

//import request api
import request from '../configs/request';
//import uri config api
import { base, usersApi } from '../configs/config';
//  import clear token api
// import { clearItem, setItem } from '../actions/user';


//LOGIN async actions handle function
function* loginAuthorize(payload) {
  const { body } = payload;
  try {
    const { token, id } = yield call(request.post, base + usersApi.login, body);
    yield put({ type: LOGIN_SUCCESS, token, id });
    return token;
  } catch(error) {
    yield put({ type: LOGIN_ERROR, error });
  }
}

//register async actions handle function
function* registerAuthorize(payload) {
  try {
    const { body } = payload;
    yield call(request.post, base + usersApi.register, body);
    yield put({ type: REGISTER_SUCCESS });
    yield put({ type: LOGIN, payload });
  } catch (error) {
    yield put({ type: REGISTER_ERROR });
  }
}

//change password async actions handle function
function* changePassword(payload) {
  try {
    const { body, token } = payload;
    yield call(request.post, base + usersApi.changePassword, body, token);
    yield put({ type: CHANGE_PASSWORD_SUCCESS });
  } catch (error) {
    yield put({ type: CHANGE_PASSWORD_ERROR, error });
  }
}

//feedback async actions handle function
function* feedback(payload) {
  try {
    const { body, token } = payload;
    yield call(request.post, base + usersApi.feedback, body, token);
    yield put({ type: FEEDBACK_SUCCESS });
  } catch (error) {
    yield put({ type: FEEDBACK_ERROR, error });
  }
}


//send message  async actions handle function
function* requestSmsCode(payload) {
  try {
    yield call(request.post, base + usersApi.requestSmsCode, payload);
    yield put({ type: REQUEST_SMS_CODE_SUCCESS, phone });
  } catch (error) {
    yield put({ type: REQUEST_SMS_CODE_ERROR });
  }
}

//send message  async actions handle function
function* verifySmsCode(payload) {
  try {
    const { body } = payload;
    yield call(request.post, base + usersApi.verifySmsCode, body);
    const { phone } = body;
    yield put({ type: REGISTER_SEND_MESSAGE_SUCCESS, phone });
  } catch (error) {
    yield put({ type: REGISTER_SEND_MESSAGE_ERROR, error });
  }
}

//send message  async actions handle function
function* submitVerifyCode(payload) {
  try {
    const { body, token } = payload;

    const { avatar, doctor_license, id_card } = body;
    let data = new FormData();
    let keys = Object.keys(body);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === 'avatar') {
        data.append('avatar', { uri: avatar, type: 'multipart/form-data', name: 'avatar.jpg'});
      } else if (keys[i] === 'doctor_license') {
        data.append('doctor_license', { uri: doctor_license, type: 'multipart/form-data', name: 'doctor_license.jpg'});
      } else if (keys[i] === 'id_card') {
        data.append('id_card', { uri: id_card, type: 'multipart/form-data', name: 'id_card.jpg'});
      } else {
        data.append(keys[i], body[keys[i]]);
      }
    }
    //the last param supply multipart/form-data support
    yield call(request.post, base + usersApi.doctorInit, data, token, true);
    yield put({ type: SUBMIT_VERIFY_DATA_SUCCESS });
  } catch(error) {
    yield put({ type: SUBMIT_VERIFY_DATA_ERROR, error });
  }
}

//LOGIN async actions watch function
function* loginFlow() {
  while (true) {
    const { payload } = yield take(LOGIN);
    // fork return a Task object for cancel later
    const task = yield fork(loginAuthorize, payload);
    const action = yield take([LOGOUT, LOGIN_ERROR]);

    if (action.type === LOGOUT) {
      yield cancel(task);
    }
    yield put({ type: CLEAR_TOKEN });
  }
}

//watch register action for handle
function* registerFlow() {
  while (true) {
    const { payload } = yield take(REGISTER);
    yield call(registerAuthorize, payload);
  }
}

//watch change-password action for handle
function* changePasswordFlow() {
  while (true) {
    const { payload } = yield take(CHANGE_PASSWORD);
    yield call(changePassword, payload)
  }
}

//watch feedback action for handle
function* feedbackFlow() {
  while (true) {
    const { payload } = yield take(FEEDBACK);
    yield call(feedback, payload)
  }
}


function* clearFlow() {
  while(true) {
    yield take(CLEAR);
    yield delay(1000);
    yield put({ type: CLEAR_STATE });
  }
}

function* watchRequestSmsCode() {
  while (true) {
    const { payload } = yield take(REQUEST_SMS_CODE);
    yield call(requestSmsCode, payload)
  }
}

function* watchVerifySmsCode() {
  while (true) {
    const { payload } = yield take(REGISTER_SEND_MESSAGE);
    yield call(verifySmsCode, payload)
  }
}

function* watchSubmitVerifyCode() {
  while (true) {
    const { payload } = yield take(SUBMIT_VERIFY_DATA);
    yield call(submitVerifyCode, payload)
  }
}



export {
  loginFlow,
  registerFlow,
  changePasswordFlow,
  watchRequestSmsCode,
  watchVerifySmsCode,
  clearFlow,
  feedbackFlow,

  watchSubmitVerifyCode,
}