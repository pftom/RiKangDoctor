import { createSelector } from 'reselect';

//import get token common select
import { getToken } from './commonSelector';

import { getDoctorId } from './answerSelector';

const getIsGetOrders = (state) => state.getIn(['service', 'isGetOrders']); 
const getOrderSuccess = (state) => state.getIn(['service', 'getOrderSuccess']); 
const getOrderError = (state) => state.getIn(['service', 'getOrderError']); 

const getOrders = (state) => state.getIn(['service', 'orders']); 

const getIsAcceptOrder = (state) => state.getIn(['service', 'isAcceptOrder']); 
const getAcceptOrderSuccess = (state) => state.getIn(['service', 'acceptOrderSuccess']); 
const getAcceptOrderError = (state) => state.getIn(['service', 'acceptOrderError']); 

const getServiceSelector = createSelector(
  [ getDoctorId, getToken, getOrders, getIsGetOrders, getOrderSuccess, getOrderError, getIsAcceptOrder, getAcceptOrderSuccess, getAcceptOrderError ],
  ( doctorId, token, orders, isGetOrders, getOrderSuccess, getOrderError, isAcceptOrder, acceptOrderSuccess, acceptOrderError) => ({
    doctorId,
    token,
    orders,
    isGetOrders,
    getOrderSuccess,
    getOrderError,
    isAcceptOrder,
    acceptOrderSuccess,
    acceptOrderError,
  })
);

export {
  getServiceSelector,
}