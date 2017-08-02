import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';


//import screen adapt util
import px2dp from '../../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');

//single input style
export const  HeaderSectionStyle = StyleSheet.create({
  headerBox: {
    width: width,
    height: px2dp(221),
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    marginTop: px2dp(32),
  },

  topBox: {
    width: width - 2 * px2dp(16),
    alignItems: 'flex-end',
    marginTop: px2dp(32),
  },
  bottomBox: {
    flexDirection: 'row',
    marginTop: px2dp(29),
    width: px2dp(289),
    justifyContent: 'space-between',
  },

  name: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: px2dp(20),
    color: '#FFF',
  },
  rightBox: {
    backgroundColor: 'transparent',
  },
  infoBox: {
    flexDirection: 'row',
    height: px2dp(33),
    width: px2dp(163),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: px2dp(1),
    borderColor: '#FFFFFF',
    backgroundColor: 'transparent',
    borderRadius: px2dp(8), 
  },
  info: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(16),
    color: '#FFF',
    marginLeft: px2dp(12),
  },

  hospital: {
    fontFamily: 'PingFangSC-Light',
    fontSize: px2dp(18),
    color: '#FFF',
    marginTop: px2dp(8),
    marginBottom: px2dp(12),
  },
})