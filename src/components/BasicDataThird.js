import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, KeyboardAvoidingView, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Picker } from 'antd-mobile';


import { BasicDataFirstStyle as styles } from './styles/';


class BasicDataThird extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      consult_price: '',
    };
  }

  handleSubmit = () => {
    const { consult_price } = this.state;

    const { navigation } = this.props;
    const { body } = navigation.state.params;

    navigation.navigate('BasicDataFourth', {  body: { ...body, consult_price } } );
    // if (isNaN(parseFloat(consult_price))) {
    //   this.failToast('咨询单价必须是有效数字');
    // } else {
    //   navigation.navigate('BasicDataFourth', {  body: { ...body, doctor_license, id_card, consult_price } } );
    // }
  }

  failToast(msg) {
    Toast.fail(msg, 1);
  }
  render() {
    const { navigation, dispatch } = this.props;
    const { token } = navigation.state.params;


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.titleText}>基本资料</Text>
        <Text style={styles.essential}>填写咨询价格(元/次)</Text>
        <View style={styles.consultInputBox}>
          <View style={styles.inputInnerBox}>
            <TextInput
              ref="textInput"
              style={[ styles.consultInput ]}
              onChangeText={(text) => this.setState({ consult_price: text })}
              value={this.state.consult_price}
              maxLength={5}
              autoCorrect={false}
          />
          </View>
        </View>
        <View style={styles.vacuateBox}>
          <Text style={styles.vacuate}>您所填写的收入是患者将支付的收入，日康将从中抽取30%的提成。</Text>
        </View>
        <View style={[ styles.nextBox, styles.extraNext ]}>
          <TouchableOpacity onPress={() => { this.handleSubmit() }}>
            <Image source={require('./TabOne/img/next.png')} />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect()(BasicDataThird);