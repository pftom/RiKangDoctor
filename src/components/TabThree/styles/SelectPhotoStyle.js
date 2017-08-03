import React from 'react';
import { StyleSheet, Dimensions, } from 'react-native';


//import screen adapt util
import px2dp from '../../../utils/px2dp';

//get screen width and height
const { width, height } = Dimensions.get('window');

//single input style
export const SelectPhotoStyle = StyleSheet.create({
  avatarBox: {
    width: px2dp(90),
    height: px2dp(90),
    borderRadius: px2dp(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6F7',
  },
  avatar: {
    width: px2dp(90),
    height: px2dp(90),
    borderRadius: px2dp(45),
  },
  avatarText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#000',
    backgroundColor: 'transparent',
  },
  addPhotoContainer: {
    height: px2dp(86),
    width: px2dp(86),
  },
  addPhotoBox: {
    borderWidth: 1,
    borderColor: '#DADADA',
    height: px2dp(86),
    width: px2dp(86),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    fontFamily: 'PingFangSC-Light',
    fontSize: 14,
    color: '#D4D4D4',
    marginTop: px2dp(10),
  },

  settingBox: {
    height: px2dp(40),
    width: px2dp(40),
    borderRadius: px2dp(20),
  },
  settingAvatar: {
    height: px2dp(40),
    width: px2dp(40),
    borderRadius: px2dp(20),
  },

  basicBox: {
    height: px2dp(60),
    width: px2dp(60),
    borderRadius: px2dp(30),
    marginTop: px2dp(-30)
  },
  basicAvatar: {
    height: px2dp(60),
    width: px2dp(60),
    borderRadius: px2dp(30),
  },

  basicFourthBox: {
    height: px2dp(134),
    width: px2dp(238),
    borderRadius: px2dp(8),
    marginTop: px2dp(18),
    borderWidth: px2dp(0.5),
    borderColor: '#D2D2D2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  basicFourthAvatar: {
    height: px2dp(134),
    width: px2dp(238),
    borderRadius: px2dp(8),
    position: 'absolute',
  },
  uploadText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: px2dp(14),
    color: '#CDCDCD',
    marginTop: px2dp(18),
  }
})