import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, } from 'react-native';
import { connect } from 'react-redux';


import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from './CustomTabBar';
import UltimateFlatList from '../../common/UltimateFlatList';


//import px to dp 
import px2dp from '../../../utils/px2dp';

//import action constants
import { 
  GET_SERVICE_ORDER,
  ACCEPT_SERVICE_ORDER,
  CLEAR_ORDER_STATE,

  GET_DOCTOR_PROFILE,
 } from '../../../constants/'

//import selector from select data
import { getServiceSelector } from '../../../selectors/';

import TabOneHeaderSection from './TabOneHeaderSection';

//import list item
//import new order list item
import NewOrderListItem from './NewOrderListItem';
//import going list item
import UnderGoingListItem from './UnderGoingListItem';
//import finished list item
import FinishedListItem from './FinishedListItem';

//use fake data

//import handle data func
import {
  handleServiceData,
  ITEMS,
} from '../data/'



class TabOneMainScreen extends PureComponent {

  componentDidMount() {

    const { dispatch, navigation, token } = this.props;

    // dispatch({ type: GET_SERVICE_ORDER, payload: { token } });
    dispatch({ type: GET_DOCTOR_PROFILE, payload: { token } });
  } 

  renderItem = (item, kind) => {
    const { navigation, dispatch, token } = this.props;

    if (kind === 'newOrderData') {
      return <NewOrderListItem item={item} navigation={navigation} dispatch={dispatch} token={token} />;
    }

    if (kind === 'underGoingData') {
      return <UnderGoingListItem item={item} navigation={navigation} dispatch={dispatch} token={token} />;
    }

    if (kind === 'finishedData') {
      return <FinishedListItem item={item} navigation={navigation} dispatch={dispatch} token={token} />;
    }
  }

  render() {
    const { dispatch, navigation  } = this.props;
    //get service data
    const { token, orders, isGetOrders, getOrderSuccess, getOrderError, isAcceptOrder, acceptOrderSuccess, acceptOrderError } = this.props;

    let newOrderData = [
      {
        avatar: require('../img/avatar.jpg'),
        name: '指尖泛出的繁华',
        key: 1,
      },
      {
        avatar: require('../img/avatar.jpg'),
        name: '指尖泛出的繁华',
        key: 2,
      },
      {
        avatar: require('../img/avatar.jpg'),
        name: '指尖泛出的繁华',
        key: 3,
      },
    ];
    let underGoingData = [
      {
        name: '指尖泛出的繁华',
        key: 1,
      },
      {
        name: '指尖泛出的繁华',
        key: 2,
      },
      {
        name: '指尖泛出的繁华',
        key: 3,
      },
    ];
    let finishedData = [
      {
        name: '指尖泛出的繁华',
        key: 1,
        ratings: 4,
      },
      {
        name: '指尖泛出的繁华',
        key: 2,
        ratings: 3,
      },
      {
        name: '指尖泛出的繁华',
        key: 3,
        ratings: 5,
      },
    ];
    //service for later handle
    if (orders.size > 0) {
      newOrderData = handleUserData(orders, 'paid');
      underGoingData = handleUserData(orders, 'underway')
      finishedData = handleUserData(orders, 'finished');
    }

    const DATA = [
      newOrderData,
      underGoingData,
      finishedData,
    ];

    const LABEL = [
      '新的咨询',
      '进行中',
      '已完成',
    ];

    
    
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F6F7'}}>
        <TabOneHeaderSection content="在线咨询" />
        <ScrollableTabView
          page={0}
          style={ Platform.OS === 'ios' ? { marginTop: px2dp(77) } : { marginTop: px2dp(76) }}
          renderTabBar={
            () => <CustomTabBar 
                      multiCustom={true} 
                      underlineStyle={
                        Platform.OS === 'ios'
                        ? { marginLeft: px2dp(28) }
                        : { marginLeft: 0 }
                      }
                      tabTextStyle={{
                        fontSize: px2dp(18),
                      }}
                  />
          }
        >
          {
            ITEMS.map((kind, key) => (
              <UltimateFlatList
                key={key}
                listData={DATA[key]}
                data={orders}
                simplify={true}
                tabLabel={LABEL[key]}
                dispatch={this.props.dispatch}
                token={token}
                footText={"到底了哦"}
                renderItem={(item) => { return this.renderItem(item, kind); }}
              />
            ))
          }
        </ScrollableTabView>
      </View>
    )
  }
}

export default connect(
  state => getServiceSelector(state),
)(TabOneMainScreen);
