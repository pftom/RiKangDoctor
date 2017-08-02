import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';


//import screen adapt util
import px2dp from '../../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');

//single input style
export const  UserScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  midBox: {
    width: width,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleBox: {
    width: width / 2 - 1,
    borderRightWidth: px2dp(0.5),
    borderRightColor: '#CECECE',
    height: px2dp(193),
    marginBottom: px2dp(0.5),
    borderBottomWidth: px2dp(0.5),
    borderBottomColor: '#CECECE',

    alignItems: 'center',
    justifyContent: 'center',
  },
  extraTitleBox: {
    flexDirection: 'row',
    width: px2dp(140),
    height: px2dp(28),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  img: {
    tintColor: '#C7C7CC',
    height: px2dp(16),
    width: px2dp(10),
  },
  content: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(48),
    color: '#0BA381',
  },
  title: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(18),
    color: '#000000',
  },
  extraTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(20),
    color: '#000000',
    letterSpacing: px2dp(-0.4),
  },
})