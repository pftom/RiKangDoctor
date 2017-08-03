import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, KeyboardAvoidingView, Platform, View, ScrollView, Image, TouchableHighlight } from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { List, TextareaItem } from 'antd-mobile';
const Item = List.Item;

//import async action constants
import { 
  GET_SINGLE_QUESTION,

  GET_SINGLE_QUESTION_ALL_IMG,

  CREATE_SINGLE_QUESTION_ANSWER,

  CLEAR_NEW_ANSWER_STATE,
} from '../../../constants/'

//import selector for computing data
import { getCreateAnswerSelector } from '../../../selectors/';

import { Header } from '../../common/';

import px2dp from '../../../utils/px2dp';

//import tag box
import { TagBox } from '../../common/';

//import handle func
import { handleQuestion, handleAnswers } from '../data/';

//import style
import { NewQuestionStyle as styles } from '../styles/';


//import list
import { UltimateFlatList } from '../../common/';

//import item
import QaAnswerListItem from './QaAnswerListItem';

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

class NewAnswer extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      diagnosis: '',
      prescription: '',
      course: '',
      advice: '',
    };
  }

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const { token, id } = navigation.state.params;

    // dispatch({ type: GET_SINGLE_QUESTION, payload: { token, id }});
    // dispatch({ type: GET_SINGLE_QUESTION_ALL_IMG, payload: { token, id }});
  }

  componentWillReceiveProps(nextProps) {
    const { isCreateAnswer, createAnswerSuccess, createAnswerError } = nextProps;

    if (isCreateAnswer) {
      this.loadingToast();
    }

    if (createAnswerSuccess) {
      this.successToast('回答成功');
    }

    if (createAnswerError) {
      this.failToast('回答失败');
    }
  }

  handleBtn = () => {
    const { navigation, dispatch } = this.props;
    const { token, id } = navigation.state.params;
    const { diagnosis, prescription, course, advice } = this.props;

    if (diagnosis.length === 0) {
      this.failToast('疾病预测不能为空');
    } else if (prescription.length === 0) {
      this.failToast('药物选择不能为空');
    } else if (course.length === 0) {
      this.failToast('推荐疗程不能为空');
    } else if (advice.length === 0) {
      this.failToast('指导建议不能为空');
    } else {
      const body = {
        diagnosis,
        prescription,
        course,
        advice,
      };
      dispatch({ type: CREATE_SINGLE_QUESTION_ANSWER, payload: { token, id, body }});
    }
  }

  successToast(msg) {

    const { navigation, dispatch } = this.props;
    const { token, id } = navigation.state.params;

    this.props.dispatch({ type: CLEAR_NEW_ANSWER_STATE });
    Toast.success(msg, 1);

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'TabBarNavigation' }),
        NavigationActions.navigate({ routeName: 'TabTwoNavigation' }),
        NavigationActions.navigate({ 
          routeName: 'QuestionDetail',  
          params: {
            token,
            id,
            dispatch,
          },
        }),
      ]
    });

    navigation.dispatch(resetAction);
  }

  failToast(msg) {
    this.props.dispatch({ type: CLEAR_NEW_ANSWER_STATE });
    Toast.fail(msg, 1);
  }

  loadingToast() {
    Toast.loading('请稍后...', 1);
  }

  render() {
    const { question, AllImg, dispatch, navigation } = this.props;
    const { token, id } = navigation.state.params;

    let IMGS = [];
    if (AllImg) {
      AllImg.map(item => {
        IMGS.push({
          photo: item.get('image'),
        })
      });
    }

    let header = null;
    if (question) {
      header = () => (
        <View style={styles.questionContainer}>
          <View style={styles.topBox}>
              <Text style={styles.title}>
                {question.get('title')}
              </Text>  
              
            </View>
            <View style={styles.body}>
              <Text style={styles.content}>{question.get('body')}</Text>
            </View>
            
            <View style={styles.imgBox}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  IMGS.map((item, key) => (
                    <TouchableOpacity key={key} onPress={() => navigation.navigate('ImageView', { media: IMGS })}>
                      <Image source={{ uri: item.photo }} style={styles.photo} />
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </View>
            <View style={styles.graySpace}/>
        </View>
      );
    }


    const bodyData = [
      {
        title: '疾病预测',
        placeholder: '在此处填写疾病预测',
        sign: 'diagnosis',
        
      },
      {
        title: '药物选择',
        placeholder: '在此处填写疾病预测',
        sign: 'prescription',
      },
      {
        title: '推荐疗程',
        placeholder: '在此处填写疾病预测',
        sign: 'course',
      },
      {
        title: '指导建议',
        placeholder: '在此处填写疾病预测',
        sign: 'advice',
      },
    ];

    return (
          <KeyboardAvoidingView 
            style={styles.container} 
            behavior={ Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={-100}
          >
            {
              header
            }
            <Header
              logoLeft={true}
              headerText={"新的回答"}
              navigation={navigation}
              showGradient={true}
            />
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}
            >
              {
                bodyData.map((item, key) => (
                  <List key={key} style={{ marginTop: px2dp(12) }}>
                    <Item>{item.title}</Item>
                    <TextareaItem
                      placeholder={item.placeholder}
                      value={this.state[item.sign]}
                      count={200}
                      rows={5}
                      onChange={(text) => { this.setState({ [item.sign]: text }) }}
                    />
                  </List>
                ))
              }
              <View style={styles.BottomBtn}>
                <TouchableHighlight onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
                  <View style={styles.buttonBox}>
                    <Text style={[ styles.content, this.props.textStyle ]}>提交回答</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
  }
}

export default connect(
  state => getCreateAnswerSelector(state),
)(NewAnswer);