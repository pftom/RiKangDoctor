import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, KeyboardAvoidingView, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Picker } from 'antd-mobile';


import { BasicDataFirstStyle as styles } from './styles/';

//import opposit department
import { opppsiteDepartment } from '../utils/transferAbbr';

import SelectPhoto from './TabThree/common/SelectPhoto';


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

    let renderContent = null;
    if (key === 1) {
      renderContent = (
        <TextInput
              ref="textInput"
              style={[ styles.department, styles.textInput ]}
              placeholder={'输入您的从医时间'}
              onChangeText={(text) => this.setState({ doctorAge: text })}
              placeholderTextColor="#BFBFBF"
              value={this.state.doctorAge}
              maxLength={20}
              autoCorrect={false}
          />
      )
    }

    if (key === 0) {
      renderContent = (
        <View style={styles.avatarBox}>
          <Text style={styles.upLoadAvatar}>点击此处上传</Text>
          <SelectPhoto avatar={this.state.avatar} basicPhoto={true} handleAddPic={this.handleAddPic} />
        </View>
      )
    }

    if (key === 2) {
      renderContent = (
        <Picker
          data={selectTitle}
          title='选择您的职位'
          cols={1}
          value={this.state.pickerValue}
          onChange={v => this.setState({ pickerValue: v })}
        >
          <CustomChildren title={pickerValue.length && pickerValue[0]} />
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
              renderContent
            }
          </View>
        </View>
      </View>
    )
  }

  handleAddPic = (photo) => {
    this.setState({
      avatar: photo,
    })
  }

  handleSubmit = () => {
    const { avatar, doctorAge, pickerValue } = this.state;
    const { navigation } = this.props;

    const { body } = navigation.state.params;

    navigation.navigate('BasicDataThird', { body: { ...body, avatar, doctorAge, pickerValue }});

    // if (avatar === 'https://facebook.github.io/react/img/logo_og.png') {
    //   this.failToast('头像不能为空');
    // } else if (isNaN(parseInt(doctorAge))) {
    //   this.failToast('从医时间只能为数字');
    // } else if (!pickerValue[0]) {
    //   this.failToast('职位不能为空');
    // } else {
    //   navigation.navigate('BasicDataThird', { body: { ...body, avatar, doctorAge, pickerValue }});
    // }
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
      },
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

export default connect()(BasicDataSecond);