import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';

import { ServiceStyle as styles } from '../styles/';

import { Header } from '../../common/';

import { List } from 'antd-mobile';

const Item = List.Item;

import { GET_DOCTOR_INCOME } from '../../../constants/';

import { getDoctorIncomeSelector } from '../../../selectors/';

class Income extends PureComponent {

  componentDidMount() {
    const { navigation, dispatch } = this.props;

    const { token } = navigation.state.params;

    dispatch({ type: GET_DOCTOR_INCOME, payload: { token } } );
  }

  render() {
    const { navigation, doctorIncome } = this.props;
    console.log('doctorIncome', doctorIncome && doctorIncome.toJS());

    return (
      <View>
        <Header
          logoLeft={true}
          showGradient={true}
          headerText="收入情况"
          navigation={navigation}
        />
        <List
          renderHeader={() => '您从加入日康开始在平台上获得的患者咨询总收入。'}
        >
          <Item
            extra={(doctorIncome && doctorIncome.get('total')) || '0.00'}
          >
            平台总收入（元）
          </Item>
        </List>
        <List
          renderHeader={() => '我司已为您分配的收入，您可以打开微信以查收。分配时我们收取了30%的提成，感谢您的支持。'}
        >
          <Item
            extra={(doctorIncome && doctorIncome.get('gained')) || '0.00'}
          >
            已分配收入（元）
          </Item>
        </List>
        <List
          renderHeader={() => '我司尚未为您分配的收入，我们会尽快将收入支付给您。'}
        >
          <Item
            extra={(doctorIncome && doctorIncome.get('suspended')) || '0.00'}
          >
            待分配收入（元）
          </Item>
        </List>
      </View>
    )
  }

}

export default connect(
  state => getDoctorIncomeSelector(state),
)(Income);