import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';


//import screen adapt util
import px2dp from '../../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');

//single input style
export const SelectPhotoStyle = StyleSheet.create({
  avatarBox: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6F7',
  },
  avatar: {
    width: px2dp(60),
    height: px2dp(60),
    borderRadius: px2dp(30),
  },
  avatarText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#000',
    backgroundColor: 'transparent',
  },
})