import React, { PureComponent } from 'react';
import { TouchableOpacity, Image, KeyboardAvoidingView, Text, View, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { Picker, Toast } from 'antd-mobile';



import { BasicDataFirstStyle as styles } from './styles/';

//import opposit department
import { opppsiteDepartment } from '../utils/transferAbbr';


import { selectDep } from './TabOne/data/';

const CustomChildren = props => (
  <TouchableOpacity onPress={props.onClick}>
    <View style={styles.selectBox}>
      <Text style={styles.department}>{props.department || '选择你的科室'}</Text>
      <Image source={require('./TabOne/img/triangle.png')} />
    </View>
  </TouchableOpacity>
)


class BasicDataFirst extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      hospitalName: '',
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
    let DATA = [
      'name',
      'hospitalName',
    ];

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
              key === 0 || key === 1 
              ? (
                <TextInput
                  ref="textInput"
                  style={[ styles.department, styles.textInput ]}
                  placeholder={key === 0 ? '在此输入您的姓名' : '在此填入你就职的医院'}
                  onChangeText={(text) => this.setState({ [DATA[key]]: text }) }
                  placeholderTextColor="#BFBFBF"
                  value={this.state[DATA[key]]}
                  maxLength={20}
                  autoCorrect={false}
              />
              )
              : (
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
          </View>
        </View>
      </View>
    )
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

  handleSubmitData = () => {
    const { name, hospitalName, pickerValue } = this.state;

    const { navigation } = this.props;

    if (!name) {
      this.failToast('姓名不能为空');
    } else if (!hospitalName) {
      this.failToast('医院名不能为空');
    } else if (!pickerValue[0]) {
      this.failToast('科室不能为空');
    } else {
      navigation.navigate('BasicDataSecond', { body: { name, hospital: hospitalName, department: opppsiteDepartment[pickerValue[0]] }})
    }
  }

  render() {
    const { navigation, dispatch } = this.props;

    console.log('navigation', opppsiteDepartment[this.state.pickerValue[0]]);
    console.log('dep', opppsiteDepartment);

    const data = [
      {
        icon: require('./TabOne/img/person.png'),
        title: '姓名'
      },
      {
        icon: require('./TabOne/img/plus.png'),
        title: '所属医院',
      },
      {
        icon: require('./TabOne/img/kind.png'),
        title: '姓名'
      },
    ];

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={styles.titleText}>基本资料</Text>
        <Text style={styles.essential}>必要信息的填写</Text>
        <View style={styles.inputBox}>
          {
            data.map((item, key) => this.renderInputBox(item, key))
          }
        </View>
        <Text style={styles.notice}>注意：确认后将无法更改</Text>
        <View style={styles.nextBox}>
          <TouchableOpacity onPress={() => { this.handleSubmitData() }}>
            <Image source={require('./TabOne/img/next.png')} />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect()(BasicDataFirst);