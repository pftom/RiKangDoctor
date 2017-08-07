import { createSelector } from 'reselect';


const getSingleAnswerAllComments = (state) => state.getIn(['answer', 'singleAnswerAllComments']);
const getCommentList = (state) => state.getIn(['answer', 'commentListSeq']);
const getSingleCommentLoadingData = (state) => state.getIn(['answer', 'isCommenting']);
const getSingleCommentLoadingError = (state) => state.getIn(['answer', 'commentError']);
const getSingleCommentLoadingSuccess = (state) => state.getIn(['answer', 'commentSuccess']);
const getUserId = (state) => state.getIn(['auth', 'id']);

export const getDoctorId = (state) => state.getIn(['auth', 'doctorProfile', 'id']);


export const getAnswerCommentSelector = createSelector(
  [ getDoctorId, getUserId, getSingleAnswerAllComments, getCommentList, getSingleCommentLoadingData, getSingleCommentLoadingError, getSingleCommentLoadingSuccess ],
  ( doctorId, userId, singleAnswerAllComments, commentListSeq, isCommenting, commentError, commentSuccess) => {
    return {
      doctorId,
      userId,
      singleAnswerAllComments,
      commentListSeq,
      isCommenting,
      commentError,
      commentSuccess,
    }
  }
);