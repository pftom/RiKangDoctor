import React, { PureComponent } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
 } from 'react-native';
import { connect } from 'react-redux';

//import action constants
import { GET_QUESTIONS, GET_SINGLE_DOCTOR_ANSWERS, } from '../../../constants/'
//import selector
import { getQaSelector } from '../../../selectors/'

import QuestionListItem from './QuestionListItem';
//import list data
import QaAnswerListItem from './QaAnswerListItem';

//import list
import { UltimateFlatList } from '../../common/';

import {
  handleQuestions,
} from '../data/';

//handle func
import {
  handleAnswers
} from '../../TabTwo/data/';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from '../../TabOne/views/CustomTabBar';


//import px to dp 
import px2dp from '../../../utils/px2dp';

import TabOneHeaderSection from '../../TabOne/views/TabOneHeaderSection';

class QaScreen extends PureComponent {

  constructor(props) {
    super(props);

    // this.state = {
    //   sort: '默认排序',
    //   dep: '全部科室',
    //   text: '',
    // }
  }

  componentDidMount() {
    const { navigation, dispatch, token, userId } = this.props;

    // dispatch({ type: GET_QUESTIONS, payload: { token, refresh: true }});
    // dispatch({ type: GET_SINGLE_DOCTOR_ANSWERS, payload: { token, id: userId, refresh: true }});
  }

  renderItem = (item, kind) => {
    const { navigation, dispatch, token, questionFav, questionStarredFav } = this.props;

    if (kind === 'questionList') {
      return <QuestionListItem questionFav={questionFav} questionStarredFav={questionStarredFav} token={token} dispatch={dispatch} navigation={navigation} item={item} />
    }

    if (kind === 'answerList') {
      return <QaAnswerListItem  token={token} navigation={navigation} item={item} />
    }
  }
  
  render() {
    const { questions, answers, navigation,  token, dispatch } = this.props;
    let questionList = [
      {
        title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        stars: 221,
        answer_num: 12,
        key: 1,
      },
      {
        title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        stars: 221,
        answer_num: 12,
        key: 2,
      },
      {
        title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        stars: 221,
        answer_num: 12,
        key: 3,
      },
    ];
    if (questions) {
      //the second params for horizontal(true) show ten item,
      questionList = handleQuestions(questions.get('results'));
      console.log('questionList', questionList);
    }

    let answerList = [
      {
        question_title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        comment_num: 5,
        diagnosis: '接触性皮炎',
        prescription: '卤米松或艾洛松软膏',
        course: '两周到三周',
        advice: '上房揭瓦',
        key: 1,
      },
      {
        question_title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        comment_num: 5,
        diagnosis: '接触性皮炎',
        prescription: '卤米松或艾洛松软膏',
        course: '两周到三周',
        advice: '上房揭瓦',
        key: 2,
      },
      {
        question_title: '最近两天疤痕周围突然很痒，请问我这是怎么了？',
        comment_num: 5,
        diagnosis: '接触性皮炎',
        prescription: '卤米松或艾洛松软膏',
        course: '两周到三周',
        advice: '上房揭瓦',
        key: 3,
      },
    ];
    //service for later handle
    if (answers) {
      answerList = handleAnswers(answers.get('results'));
    }

    const DATA = [
      questionList,
      answerList,
    ];

    const LABEL = [
      '新的问题',
      '我的回答',
    ];

    const METHOD = [
      GET_QUESTIONS,
      GET_SINGLE_DOCTOR_ANSWERS,
    ];
    console.log('method', METHOD[1]);

    const DATASELECT = [
      questions,
      answers,
    ];

    const ITEMS = [
      'questionList',
      'answerList',
    ];

    return (
      <View style={{ flex: 1, backgroundColor: '#F5F6F7'}}>
        <TabOneHeaderSection content="问答社区" />
        <ScrollableTabView
          page={0}
          style={ Platform.OS === 'ios' ? { marginTop: px2dp(77) } : { marginTop: px2dp(76) }}
          renderTabBar={
            () => <CustomTabBar 
                      multiCustom={true} 
                      underlineStyle={
                        Platform.OS === 'ios'
                        ? { marginLeft: px2dp(57) }
                        : { marginLeft: 0 }
                      }
                      tabTextStyle={{
                        fontSize: px2dp(18),
                      }}
                  />
          }
        >
          {
            ITEMS.map((kind, key) => {
              console.log('key', key);
              console.log('METHOD', METHOD[key]);
              return (
                <UltimateFlatList
                  key={key}
                  listData={DATA[key]}
                  tabLabel={LABEL[key]}
                  method={METHOD[key]}
                  data={DATASELECT[key]}
                  enableRefresh={true}
                  refreshMethod={[ METHOD[key] ]}
                  dispatch={this.props.dispatch}
                  token={token}
                  footText={"到底了哦..."}
                  renderItem={(item) => { return this.renderItem(item, kind); }}
                />
              )
            })
          }
        </ScrollableTabView>
      </View>
    )
  }
}

QaScreen.navigationOptions = {
  title: 'Qa Screen',
};

export default connect(
  (state) =>  getQaSelector(state)
)(QaScreen);
