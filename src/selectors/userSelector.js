import { createSelector } from 'reselect';

//import get token common select
import { getToken } from './commonSelector';

const getPatientProfile = (state) => state.getIn(['user', 'patientProfile']);
const getPatientFavPosts = (state) => state.getIn(['patient', 'postFav']);
const getPatientFavDoctors = (state) => state.getIn(['patient', 'doctorFav']);
const getPatientQuestions = (state) => state.getIn(['patient', 'questionFav']);
const getPatientStarredQuestions = (state) => state.getIn(['patient', 'questionStarredFav']);
const getPatientServices = (state) => state.getIn(['patient', 'servicesFav']);

const getPatientFetchPosts = (state) => state.getIn(['patient', 'patientPosts']);

const getDoctorProfile = (state) => state.getIn(['auth', 'doctorProfile']);
const getDoctorInfo = (state) => state.getIn(['patient', 'doctorInfo']);


export const getDoctorProfileSelector = createSelector(
  [ getToken, getDoctorInfo, getDoctorProfile, getPatientFavPosts, getPatientFavDoctors, getPatientQuestions, getPatientStarredQuestions, getPatientServices, getPatientFetchPosts  ],
  (token, doctorInfo, doctorProfile, postFav, doctorFav, questionFav, questionStarredFav, servicesFav, postFetch, ) => ({
    token,
    doctorInfo,
    doctorProfile,

    postFav,
    doctorFav,
    questionFav,
    questionStarredFav,
    servicesFav,

    postFetch,
  }),
);

const getUpdatePatientProfileSuccess = (state) => state.getIn(['patient', 'submitProfileSuccess']);
const getUpdatePatientProfileError = (state) => state.getIn(['patient', 'submitProfileError']);


export const getPatientProfileSelector = createSelector(
  [ getPatientProfile, getUpdatePatientProfileSuccess, getUpdatePatientProfileError ],
  (patientProfile, submitProfileSuccess, submitProfileError) => ({
    patientProfile,
    submitProfileSuccess,
    submitProfileError,
  }),
);

const getIsChangePasswd = (state) => state.getIn(['auth', 'isChangePasswd']);
const getChangePasswdSuccess = (state) => state.getIn(['auth', 'changePasswdSuccess']);
const getChangePasswdError = (state) => state.getIn(['auth', 'changePasswdError']);


export const getChangePasswdSelector = createSelector(
  [ getIsChangePasswd, getChangePasswdSuccess, getChangePasswdError ], 
  (isChangePasswd, changePasswdSuccess, changePasswdError) => ({
    isChangePasswd,
    changePasswdSuccess,
    changePasswdError,
  }),
);

const getIsFeedback = (state) => state.getIn(['auth', 'isFeedback']);
const getFeedbackSuccess = (state) => state.getIn(['auth', 'feedbackSuccess']);
const getFeedbackError = (state) => state.getIn(['auth', 'feedbackError']);


export const getFeedbackSelector = createSelector(
  [ getIsFeedback, getFeedbackSuccess, getFeedbackError ], 
  (isFeedback, feedbackSuccess, feedbackError) => ({
    isFeedback,
    feedbackSuccess,
    feedbackError,
  }),
);



const getIsUpdateDoctorInfo = (state) => state.getIn(['patient', 'isUpdateInfo']);
const getUpdateInfoSuccess = (state) => state.getIn(['patient', 'updateInfoSuccess']);
const getUpdateInfoError = (state) => state.getIn(['patient', 'updateInfoError']);

export const getUpdateDoctorInfoSelector = createSelector(
  [ getIsUpdateDoctorInfo, getUpdateInfoSuccess, getUpdateInfoError ],
  (isUpdateInfo, updateInfoSuccess, updateInfoError) => ({
    isUpdateInfo,
    updateInfoSuccess,
    updateInfoError,
  }),
);