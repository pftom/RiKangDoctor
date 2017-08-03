import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, KeyboardAvoidingView, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Picker, Toast } from 'antd-mobile';


import { BasicDataFirstStyle as styles } from './styles/';

//import opposit department
import { opppsiteDepartment } from '../utils/transferAbbr';

import SelectPhoto from './TabThree/common/SelectPhoto';

import { SUBMIT_VERIFY_DATA } from '../constants/';


import {  selectTitle, mapTitle } from './TabOne/data/selectDep';
console.log('selectTitle', selectTitle)

// const selectTitle = [
//   {
//     label: 'hh',
//     value: 'hhh',
//   }
// ]

const CustomChildren = props => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={styles.selectBox}>
      <Text style={styles.department}>{props.title || '选择你的职称'}</Text>
      <Image source={require('./TabOne/img/triangle.png')} />
    </View>
  </TouchableOpacity>
)


class BasicDataSecond extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      doctor_license: 'https://facebook.github.io/react/img/logo_og.png',
      id_card: 'https://facebook.github.io/react/img/logo_og.png',
    };
  }

  componentDidMount() {
    // const { navigation, dispatch } = this.props;
    // const { token, id } = navigation.state.params;

    // dispatch({ type: GET_SINGLE_POST, payload: { token, id }});
  }

  renderInputBox = (item, key) => {
    const { navigation } = this.props;

    let avatar = key === 0 ? this.state.doctor_license : this.state.id_card;

    return (
      <View style={styles.fourthBox} key={key}>
        <Text style={styles.fourthTitle}>{item.title}</Text>
        <SelectPhoto icon={require('./TabOne/img/camera.png')}  avatar={avatar} basicFourthPhoto={true} sign={key} handleAddPic={this.handleAddPic} />
      </View>
    )
  }

  handleAddPic = (photo, data, sign) => {
    if (sign === 0) {
      this.setState({
        doctor_license: photo,
      })
    }

    if (sign === 1) {
      this.setState({
        id_card: photo,
      })
    }
  }

  handleSubmit = () => {
    const { doctor_license, id_card } = this.state;

    const { navigation, dispatch, token } = this.props;
    const { body } = navigation.state.params;


    if (doctor_license === 'https://facebook.github.io/react/img/logo_og.png') {
      this.failToast('医师执业证书不能为空');
    } else if (id_card === 'https://facebook.github.io/react/img/logo_og.png') {
      this.failToast('持证自拍不能为空');
    } else {
      dispatch({ type: SUBMIT_VERIFY_DATA, payload: { body: { ...body, doctor_license, id_card }, token }});
    }
  }

  successToast(msg) {
    Toast.success(msg, 1);
  }

  failToast(msg) {
    Toast.fail(msg, 1);
  }

  loadingToast() {
    Toast.loading('请稍后...', 1);
  }

  render() {
    const { navigation, dispatch } = this.props;
    const { token } = navigation.state.params;

    console.log('state', this.state.pickerValue)

    const data = [
      {
        title: '医师执业证书',
      },
      {
        title: '持身份证自拍',
      },
    ];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.titleText}>基本资料</Text>
        <View style={styles.fourthInputBox}>
          {
            data.map((item, key) => this.renderInputBox(item, key))
          }
        </View>
        <View style={[ styles.extraFourthNext ]}>
          <TouchableOpacity onPress={() => { this.handleSubmit() }}>
            <Image source={require('./TabOne/img/submitData.png')} />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(
  state => ({
    token: state.getIn(['auth', 'token']),
  })
)(BasicDataSecond);