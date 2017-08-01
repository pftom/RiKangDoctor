import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

//import px2dp for adapt screen
import px2dp from '../../utils/px2dp';
const { width, height } = Dimensions.get('window');

import { commonStyle } from './commonStyle';

//single input style
export const UnderGoingListItemStyle = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
  },
  box: {
    width: px2dp(320),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#DCDCDC',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorAvatarBox: {
    width: px2dp(60),
    height: px2dp(60),
    backgroundColor: '#50E3C2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(30),
  },
  doctorAvatar: {
    width: px2dp(57),
    height: px2dp(57),
    borderRadius: px2dp(28.5),
  },
  rightBox: {
    width: px2dp(248),
    height: px2dp(60),
    justifyContent: 'space-between',
  },
  nameBox: {
    width: px2dp(248),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(20),
    color: '#000',
  },
  lastTime: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(14),
    color: '#BEBEBE',
  },
  lastMessage: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(18),
    color: '#8C8C8C',
  },
});