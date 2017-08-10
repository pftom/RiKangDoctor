import React, { PureComponent } from 'react';
import { TouchableOpacity, ScrollView, Dimensions, Text, View, Image, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';

import { ServiceStyle as styles } from '../styles/';

import { Header } from '../../common/';

import { createForm } from 'rc-form';

import px2dp from '../../../utils/px2dp';

const { width, height } = Dimensions.get('window');

import { GET_PATIENT_PROFILE, UPDATE_PATIENT_PROFILE, GET_DOCTOR_INFO, UPDATE_DOCTOR_INFO } from '../../../constants/';
import { getPatientProfileSelector } from '../../../selectors/';

import { List, InputItem, Switch , WhiteSpace, TextareaItem, Picker } from 'antd-mobile';

import SelectPhoto from '../common/SelectPhoto';

const Item = List.Item;

import { SEXMAP, SEX } from '../data/';

const PICKDATA = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
];

import { transferDepartment, transferTitle } from '../../../utils/transferAbbr';

class PatientPersonInfo extends PureComponent {

  constructor(props) {
    super(props);

    const { navigation,  } = this.props;
    const { doctorInfo, doctorProfile } = navigation.state.params;

    this.state = {
      'achievements': doctorInfo && doctorInfo.get('achievements'),
      'background': doctorInfo && doctorInfo.get('background'),
      'motto': doctorInfo && doctorInfo.get('motto'),
      'specialty': doctorInfo && doctorInfo.get('specialty'),
      'avatar': doctorProfile && doctorProfile.get('avatar'),
    }
  }

  componentDidMount() {
    
  }

  handleAddPic = (photo, uri) => {
    console.log('photo', photo);
    this.setState({
      avatar: photo,
    });
  }

  handleSubmitProfile = () => {
    const { navigation } = this.props;
    const { dispatch, token, doctorProfile, doctorInfo } = navigation.state.params;
    const { achievements, background, motto, specialty, avatar } = this.state;


    if (!doctorProfile || !doctorInfo) {
      return;
    }
    

    let body1 = {
      achievements,
      background,
      motto,
      specialty,
    };


    let body2 = {
      ...doctorProfile.toJS(),
      avatar,
      start: `${2017 - doctorProfile.get('years')}-08-03`
    }

    dispatch({ type: UPDATE_PATIENT_PROFILE, payload: { body: body2, token } } );
    dispatch({ type: UPDATE_DOCTOR_INFO, payload: { body: body1, token } } );

  }

  handleInput = (sign, text) => {
    this.setState({
      [sign]: text
    });
  }

  render() {
    const { navigation, submitProfileError, submitProfileSuccess } = this.props;
    const { dispatch, doctorProfile, doctorInfo } = navigation.state.params;

    console.log('this.props', this.props);

    const bodyData = [
      {
        title: '擅长及诊所介绍',
        placeholder: '在此处填写擅长及诊所介绍',
        sign: 'achievements',
        defaultValue: (doctorInfo && doctorInfo.get('achievements')) || '',
      },
      {
        title: '医学教育背景',
        placeholder: '在此处填写医学教育背景',
        sign: 'background',
        defaultValue: (doctorInfo && doctorInfo.get('background')) || '',
      },
      {
        title: '学术研究成果、获奖介绍',
        placeholder: '在此处填写学术研究成果、获奖介绍',
        sign: 'motto',
        defaultValue: (doctorInfo && doctorInfo.get('motto')) || '',
      },
      {
        title: '医生寄语',
        placeholder: '在此处填写医生寄语',
        sign: 'specialty',
        defaultValue: (doctorInfo && doctorInfo.get('specialty')) || '',
      },
    ];

    return (
      <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'position' : 'height' }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Header 
          logoLeft={true}
          headerText="个人信息"
          navigation={navigation}
          settingSubmit={true}
          submitProfileError={submitProfileError}
          submitProfileSuccess={submitProfileSuccess}
          handleSubmitProfile={this.handleSubmitProfile}
          showGradient={true}
          dispatch={dispatch}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            ...Platform.select({
              ios: {
                height: px2dp(height - px2dp(81)),
              },
              android: {
                height: px2dp(height - px2dp(145)),
              }
            }),
            marginBottom: px2dp(10),
          }}
        >
          <List style={{ marginTop: 16 }}>
          <Item 
            multipleLine={true}
            extra={<SelectPhoto avatar={this.state.avatar} settingPhoto={true} handleAddPic={this.handleAddPic} />}
            arrow={'horizontal'}
          >
            头像
          </Item>
          <Item
            extra={doctorProfile.get('name')}
          >
            姓名
          </Item>
          <Item
            extra={doctorProfile.get('hospital')}
          >
            就职医院
          </Item>
          <Item
            extra={transferDepartment[doctorProfile.get('department')]}
          >
            科室
          </Item>
          <Item
            extra={doctorProfile.get('years')}
          >
            开始从医时间
          </Item>
          <Item
            extra={transferTitle[doctorProfile.get('title')]}
          >
            职位
          </Item>
        </List>

        {
          bodyData.map((item, key) => (
            <List style={{ marginTop: px2dp(10), marginBottom: px2dp(2) }} key={key}>
              <Item>{item.title}</Item>
              <TextareaItem
                placeholder={item.placeholder}
                count={200}
                rows={5}
                defaultValue={item.defaultValue}
                onChange={(text) => { this.handleInput(item.sign, text) }}
              />
            </List>
          ))
        }
        </ScrollView>
      </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )
  }

}


export default connect(
  state => getPatientProfileSelector(state),
)(PatientPersonInfo);