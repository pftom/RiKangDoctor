import { delay } from 'redux-saga';
import { put, take, call, fork, cancel, } from 'redux-saga/effects';


import {
  GET_SERVICE_ORDER,
  GET_SERVICE_ORDER_ERROR,
  GET_SERVICE_ORDER_SUCCESS,

  ACCEPT_SERVICE_ORDER,
  ACCEPT_SERVICE_ORDER_ERROR,
  ACCEPT_SERVICE_ORDER_SUCCESS,
} from '../constants/';

//import request api
import request from '../configs/request';
//import uri config api
import { base, serviceApi } from '../configs/config';
//  import clear token api
// import { clearItem, setItem } from '../actions/user';


function* acceptOrder(payload) {
  try {
    const { token, body } = payload;
    const { order_no } = body;

    yield call(request.post, base + serviceApi.acceptOrder, body, token);

    yield put({ type: ACCEPT_SERVICE_ORDER_SUCCESS, order_no });
  } catch (error) {
    yield put({ type: ACCEPT_SERVICE_ORDER_ERROR, error });
  }
}


function* getServiceOrder(payload) {
  try {
    const { token } = payload;


    const orders = yield call(request.get, base + serviceApi.doctorService, null, token);

    yield put({ type: GET_SERVICE_ORDER_SUCCESS, orders });
  } catch (error) {
    yield put({ type: GET_SERVICE_ORDER_ERROR, error });
  }
}


function* watchAcceptOrder() {
  while (true) {
    const { payload } = yield take(ACCEPT_SERVICE_ORDER);

    yield call(acceptOrder, payload);
  }
}

function* watchGetServiceOrder() {
  while (true) {
    const { payload } = yield take(GET_SERVICE_ORDER);

    yield call(getServiceOrder, payload);
  }
}

export {
  watchGetServiceOrder,
  watchAcceptOrder,
}