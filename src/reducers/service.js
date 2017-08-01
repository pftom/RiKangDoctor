import { List, Map } from 'immutable';

//import action constants
import { 
  GET_SERVICE_ORDER,
  GET_SERVICE_ORDER_ERROR,
  GET_SERVICE_ORDER_SUCCESS,

  ACCEPT_SERVICE_ORDER,
  ACCEPT_SERVICE_ORDER_ERROR,
  ACCEPT_SERVICE_ORDER_SUCCESS,

  CLEAR_ORDER_STATE,
} from '../constants/';

const initialServiceValue = Map({
  orders: List([]),

  isGetOrders: false,
  getOrderSuccess: false,
  getOrderError: false,

  isAcceptOrder: false,
  acceptOrderSuccess: false,
  acceptOrderError: false,
});


const service = (state = initialServiceValue, action) => {
  switch (action.type) {
    case GET_SERVICE_ORDER:

      return state.merge({
        isGetOrders: true,
        getOrderError: false,
        getOrderSuccess: false,
      });
    
    case GET_SERVICE_ORDER_SUCCESS:

      const { orders } = action;
      
      return state.merge({
        isGetOrders: false,
        getOrderSuccess: true,
        orders,
      });

    case GET_SERVICE_ORDER_ERROR:
      
      return state.merge({
        isGetOrders: false,
        getOrderError: true,
      });


    case ACCEPT_SERVICE_ORDER:

      return state.merge({
        isAcceptOrder: true,
        acceptOrderSuccess: false,
        acceptOrderError: false,
      });

    case ACCEPT_SERVICE_ORDER_SUCCESS:

      return state.merge({
        isAcceptOrder: false,
        acceptOrderSuccess: true,
      });

    case ACCEPT_SERVICE_ORDER:

      return state.merge({
        isAcceptOrder: false,
        acceptOrderError: true,
      });

    case CLEAR_ORDER_STATE:
      
      return state.merge({
        isGetOrders: false,
        getOrderError: false,
        getOrderSuccess: false,
        isAcceptOrder: false,
        acceptOrderSuccess: false,
        acceptOrderError: false,
      })

  }
}

export default service;