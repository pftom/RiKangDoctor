import React, { PureComponent } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView, 
  StatusBar,
  Animated,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Toast } from 'antd-mobile';

//import async action constants
import { 

  REFUND,
  ACCEPT_SERVICE_ORDER,
  
  CLEAR_ORDER_STATE,
} from '../../../constants/';

//import selector for computing data
import { getServiceSelector } from '../../../selectors/';

//import post style
import { NewOrderListItemStyle as styles } from '../../styles/';


export function calculateTime (orderCreatedTime, totalTime) {
    const lastOrderTime = Date.parse(orderCreatedTime);
    const now = new Date();
    const nowOrderTime = now.getTime()
    console.log('lastOrderTime', lastOrderTime, nowOrderTime)
    const remainTime = Math.floor( parseInt(totalTime) - ((nowOrderTime - lastOrderTime) / 1000 / 60 / 60) );

    return remainTime;
}

class NewOrderListItem extends PureComponent {

  handleBtn = () => {
    const { item, dispatch, token, } = this.props;

    const { order_no } = item;

    dispatch({ type: ACCEPT_SERVICE_ORDER, payload: { token, body: { order_no } }});
  }

  componentDidMount() {
    // const { item, dispatch } = this.props;

    // const { order_no, charge_id } = item;

    // const remainTime = calculateTime(item.orderCreatedTime, 2);

    // if (remainTime && remainTime <= 0) {
    //   dispatch({ type: REFUND, payload: { token, body: { charge_id, order_no } }});
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { isAcceptOrder, acceptOrderSuccess, acceptOrderError } = nextProps;

    if (isAcceptOrder) {
      this.loadingToast();
    }

    if (acceptOrderSuccess) {
      this.successToast('接单成功');
    }

    if (acceptOrderError) {
      this.failToast('接单失败');
    }

    
  }

  successToast(msg) {
    this.props.dispatch({ type: CLEAR_ORDER_STATE });
    Toast.success(msg, 1);
  }

  failToast(msg) {
    this.props.dispatch({ type: CLEAR_ORDER_STATE });
    Toast.fail(msg, 1);
  }

  loadingToast() {
    Toast.loading('请稍后...', 1);
  }

  render() {

    const { item } = this.props;

    // const remainTime = calculateTime(item.orderCreatedTime, 2);
    const remainTime = "接受（剩余1小时48分）";
    // item.avatar

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.idBox}>
            <View style={styles.doctorAvatarBox}>
              <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }} style={styles.doctorAvatar} />
            </View>
            <View style={styles.nameBox}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.consult}>向您发出咨询请求</Text>
            </View>
          </View>
          <View style={styles.btnBox}>
            <TouchableHighlight onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
              <View style={styles.buttonBox}>
                <Text style={[ styles.content, this.props.textStyle ]}>{remainTime}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(
  state => getServiceSelector(state),
)(NewOrderListItem);