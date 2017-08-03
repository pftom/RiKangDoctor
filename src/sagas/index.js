import { all } from 'redux-saga/effects';

//import userauth sagas
import { 
  loginFlow, 
  registerFlow, 
  changePasswordFlow, 
  clearFlow,
  watchRequestSmsCode,
  watchVerifySmsCode,
  feedbackFlow,

  watchSubmitVerifyCode,
} from './userSaga';

//import posts sagas
import { 
  watchGetPost, 
  watchGetPosts,
  watchAddPostFav,
  watchCancelPostFav,
} from './postSaga';

//import hospitals sagas
import { 
  watchGetHospital, 
  watchGetHospitals, 
  watchGetHospitalDoctors,
} from './hospitalSaga';


//doctor watch and handle func
import {
  watchGetDoctor,
  watchGetDoctors,

  watchDoctorInfo,
  watchDoctorComments,
  watchDoctorAnswers,
  watchAddDoctorFav,
  watchCancelDoctorFav,
} from './doctorSaga'

//patient watch and handle func
import { 
  watchGetPatientProfile, 
  watchUpdatePatientProfile,
  watchGetPatientFavDoctors,
  watchGetPatientFavPosts,
  watchGetPatientQuestions,
  watchGetPatientServices,
  watchGetPatientStarredQuestions,
} from './patientSaga';

//question watch and handle func
import {
  watchGetQuestions,
  watchGetSingleQuestion,
  watchGetSingleQuestionAllImg,
  watchCreateSIngleQuestionAnswer,
} from './questionSaga'

//answers watch and handle func
import {
  watchGetSingleQuestionAllAnswers,
  watchCreateSingleQuestionAnswer,
  watchGetSingleQuestionAnswer,
  watchUpvoteSingleQuestionAnswer,
  watchGetAnswerAllComments,
  watchCreateSingleQuestionAnswerComment,
  watchClearCommentState,
} from './answerSaga';

import {
  watchAcceptOrder,
  watchGetServiceOrder,
} from './serviceSaga.js';

export default function* rootSaga() {
  yield all([
    loginFlow(),
    registerFlow(),
    changePasswordFlow(),
    clearFlow(),
    watchRequestSmsCode(),
    watchVerifySmsCode(),
    feedbackFlow(),
    watchAcceptOrder(),
    watchGetServiceOrder(),
    watchSubmitVerifyCode(),

    watchCreateSIngleQuestionAnswer(),
    watchGetQuestions(),
    watchGetSingleQuestion(),
    watchGetSingleQuestionAllImg(),
  
    watchCreateSIngleQuestionAnswer(),

    watchDoctorAnswers(),
  ]);
}




//     watchGetPost(),
//     watchGetPosts(),
//     watchAddPostFav(),
//     watchCancelPostFav(),

//     watchGetHospital(),
//     watchGetHospitals(),
//     watchGetHospitalDoctors(),



//     watchGetPatientProfile(),
//     watchUpdatePatientProfile(),
//     watchGetPatientFavDoctors(),
//     watchGetPatientFavPosts(),
//     watchGetPatientQuestions(),
//     watchGetPatientServices(),
//     watchGetPatientStarredQuestions(),

//     watchGetQuestions(),
//     watchCreateSingleQuestion(),
//     watchAddSingleQuestionImg(),
//     watchGetSingleQuestion(),
//     watchUpdateSingleQuestion(),
//     watchGetSingleQuestionAllImg(),
//     watchStarSingleQuestion(),
//     watchCancelStarSingleQuestion(),


//     watchGetSingleQuestionAllAnswers(),
//     watchCreateSingleQuestionAnswer(),
//     watchGetSingleQuestionAnswer(),
//     watchUpvoteSingleQuestionAnswer(),
//     watchGetAnswerAllComments(),
//     watchCreateSingleQuestionAnswerComment(),
//     watchClearCommentState(),