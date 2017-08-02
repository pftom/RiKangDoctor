import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';


//import screen adapt util
import px2dp from '../../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');

//single input style
export const NewQuestionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomBtn: {
    width: width,
    height: px2dp(73),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBox: {
    width: px2dp(337),
    height: px2dp(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09C79C',
    borderRadius: 8,
  },
  buttonContainer: {
    width: px2dp(337),
    height: px2dp(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6F7',
    borderRadius: 8,
  },
  content: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: 5,

  },
})