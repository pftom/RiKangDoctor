import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, KeyboardAvoidingView, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Picker } from 'antd-mobile';


import { PutQuestionStyle as styles } from './styles/';

//import opposit department
import { opppsiteDepartment } from '../utils/transferAbbr/';


import { selectDep } from './TabTwo/data/';

const CustomChildren = props => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={styles.selectBox}>
      <Text style={styles.department}>{props.department || '选择你的科室'}</Text>
      <Image source={require('../img/triangle.png')} />
    </View>
  </TouchableOpacity>
)


class BasicDataSecond extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
      doctorAge: '',
      pickerValue: [],
    };
  }

  componentDidMount() {
    // const { navigation, dispatch } = this.props;
    // const { token, id } = navigation.state.params;

    // dispatch({ type: GET_SINGLE_POST, payload: { token, id }});
  }

  renderInputBox = (item, key) => {
    const { pickerValue } = this.state;

    const { navigation } = this.props;
    const DATA = [
      'name',
      'hospitalName',
    ];

    let renderContent = null;
    if (key === 0) {
      renderContent = (
        <TextInput
              ref="textInput"
              style={[ styles.department, styles.textInput ]}
              placeholder={key === 0 ? '头像' : '输入您的从医时间'}
              onChangeText={(text) => this.setState({ DATA[key]: text })}
              placeholderTextColor="#BFBFBF"
              value={this.state[DATA[key]]}
              maxLength={20}
              autoCorrect={false}
          />
      )
    }

    if (key === 1) {
      renderContent = (
        <View style={styles.avatarBox}><Text style={styles.upLoadAvatar}>点击此处上传头像</Text></View>
      )
    }

    if (key === 3) {
      renderContent = (
        <Picker
          data={selectDep}
          title='选择科室'
          cols={2}
          value={this.state.pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
        >
          <CustomChildren department={pickerValue.length && pickerValue[1]} />
        </Picker>
      )
    }

    return (
      <View style={styles.itemBox} key={key}>
        <LinearGradient
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={['#23BCBB', '#45E994']}
              style={styles.linearGradient} />
        <View style={styles.rightBox}>
          <View style={styles.topBox}>
            <Image source={item.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.bottomBox}>
            {
            }
          </View>
        </View>
      </View>
    )
  }

  render() {
    const { navigation, dispatch } = this.props;
    const { token } = navigation.state.params;

    const data = [
      {
        icon: require('./TabOne/img/person.png'),
        title: '头像',
      },
      {
        icon: require('./TabOne/img/time.png'),
        title: '从医时间（年）',
      },
      {
        icon: require('./TabOne/img/kind.png'),
        title: '职位'
      }
    ];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.titleText}>基本资料</Text>
        <Text style={styles.essential}>让患者更多地了解您</Text>
        <View style={styles.inputBox}>
          {
            data.map((item, key) => this.renderInputBox(item, key))
          }
        </View>
        <View style={styles.nextBox}>
          <TouchableOpacity onPress={() => { navigation.navigate('BasicDataSecond', { token, dispatch, title: this.state.text, department: opppsiteDepartment[this.state.pickerValue[1]] }) }}>
            <Image source={require('./TabOne/img/submitData.png')} />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect()(BasicDataSecond);