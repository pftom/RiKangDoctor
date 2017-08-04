import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, KeyboardAvoidingView, Keyboard, ListView, Platform, View, ScrollView, Image, TouchableHighlight } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { List, TextareaItem, Toast, } from 'antd-mobile';
const Item = List.Item;

//import async action constants
import { 
  CLEAR_INFO_STATE,
  UPDATE_DOCTOR_INFO
} from '../../../constants/'

//import selector for computing data
import { getUpdateDoctorInfoSelector } from '../../../selectors/';

import { Header } from '../../common/';

import px2dp from '../../../utils/px2dp';

//import tag box
import { TagBox } from '../../common/';

//import handle func
import { handleQuestion, handleAnswers } from '../data/';

//import style
import { NewQuestionStyle as styles } from '../../TabTwo/styles/';


const EXMAPLES = [
  {
    photo: 'https://facebook.github.io/react/img/logo_og.png'
  },
  {
    photo: 'https://facebook.github.io/react/img/logo_og.png'
  },
  {
    photo: 'https://facebook.github.io/react/img/logo_og.png'
  },
  {
    photo: 'https://facebook.github.io/react/img/logo_og.png'
  },
];

class DoctorInfo extends PureComponent {

  constructor(props) {
    super(props);

    const bodyData = [
      {
        title: '擅长及诊所介绍',
        placeholder: '在此处填写擅长及诊所介绍',
        sign: 'achievements',
      },
      {
        title: '医学教育背景',
        placeholder: '在此处填写医学教育背景',
        sign: 'background',
      },
      {
        title: '学术研究成果、获奖介绍',
        placeholder: '在此处填写学术研究成果、获奖介绍',
        sign: 'motto',
      },
      {
        title: '医生寄语',
        placeholder: '在此处填写医生寄语',
        sign: 'specialty',
      },
    ];

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      'achievements': '',
      'background': '',
      'motto': '',
      'specialty': '',
      dataSource: ds.cloneWithRows(bodyData),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isUpdateInfo, updateInfoSuccess, updateInfoError } = nextProps;

    if (isUpdateInfo) {
      this.loadingToast();
    }

    if (updateInfoSuccess) {
      this.successToast('回答成功');
    }

    if (updateInfoError) {
      this.failToast('回答失败');
    }
  }

  handleBtn = () => {
    const { navigation, dispatch } = this.props;
    const { token, id } = navigation.state.params;
    const { achievements, background, motto, specialty } = this.state;

    let body = {
      achievements,
      background,
      motto,
      specialty,
    };
    dispatch({ type: UPDATE_DOCTOR_INFO, payload: { body, token } } );

    Keyboard.dismiss();
  }

  successToast(msg) {

    const { navigation, dispatch } = this.props;
    const { token, id } = navigation.state.params;

    this.setState({
      'achievements': '',
      'background': '',
      'motto': '',
      'specialty': '',
    })

    this.props.dispatch({ type: CLEAR_INFO_STATE });
    Toast.success(msg, 1);
  }

  failToast(msg) {
    this.props.dispatch({ type: CLEAR_INFO_STATE });
    Toast.fail(msg, 1);
  }

  loadingToast() {
    Toast.loading('请稍后...', 1);
  }

  handleInput = (sign, text) => {
    this.setState({
      [sign]: text
    });
  }

  render() {
    const { question, AllImg, dispatch, navigation } = this.props;
    const { token, id } = navigation.state.params;


    return (
          <KeyboardAvoidingView 
            style={styles.container} 
            behavior={ Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={-100}
          >
            <Header
              logoLeft={true}
              headerText={"详细资料"}
              navigation={navigation}
              showGradient={true}
            />
            <ListView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
              dataSource={this.state.dataSource}
              renderRow={(item) => (
                <List style={{ marginTop: px2dp(12) }}>
                    <Item>{item.title}</Item>
                    <TextareaItem
                      placeholder={item.placeholder}
                      count={200}
                      rows={5}
                      onChange={(text) => { this.handleInput(item.sign, text) }}
                    />
                  </List>
              )}
              renderFooter={() => (
                <View style={styles.BottomBtn}>
                  <TouchableHighlight onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
                    <View style={styles.buttonBox}>
                      <Text style={[ styles.content, this.props.textStyle ]}>提交回答</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              )}
            />
        </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => getUpdateDoctorInfoSelector(state),
)(DoctorInfo);