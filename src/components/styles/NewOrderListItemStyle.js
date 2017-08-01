import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';


//import common style
import { commonStyle } from './commonStyle';

//import screen adapt util
import px2dp from '../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');


export const NewOrderListItemStyle = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
  },
  box: {
    width: px2dp(325),
    borderBottomWidth: px2dp(1),
    borderBottomColor: '#DCDCDC',
  },
  idBox: {
    width: px2dp(325),
    flexDirection: 'row',
    height: px2dp(41),
    alignItems: 'center',
  },
  doctorAvatarBox: {
    width: px2dp(41),
    height: px2dp(41),
    backgroundColor: '#50E3C2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: px2dp(20.5),
  },
  doctorAvatar: {
    width: px2dp(38),
    height: px2dp(38),
    borderRadius: px2dp(19.5),
  },

  name: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: px2dp(18),
    color: '#000',
  },

  consult: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#787878',
  },

  buttonBox: {
    width: px2dp(337),
    height: px2dp(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09C79C',
    borderRadius: px2dp(8),
  },
  buttonContainer: {
    width: px2dp(337),
    height: px2dp(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6F7',
    borderRadius: px2dp(8),
  },
  content: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: px2dp(20),
    color: '#FFF',
    letterSpacing: px2dp(5),

  },
});