import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

//import style
import { HeaderSectionStyle as styles } from '../styles/HeaderSectionStyle';

import LinearGradient from 'react-native-linear-gradient';

//import select photo
import SelectPhoto from '../common/SelectPhoto';

import { UPDATE_PATIENT_PROFILE } from '../../../constants/';

import { SEXMAP } from '../data/';

class TabThreeHeaderSection extends PureComponent {

  handleAddPic = (img) => {
    const { dispatch, token, doctorProfile } = this.props;

    let body = {
      name: doctorProfile.get('name') || '无',
      avatar: img,
      age: isNaN(parseInt(doctorProfile.get('age'))) ? 18 : parseInt(doctorProfile.get('age')),
      sex: doctorProfile.get('sex') || 'U',
      medical_history: doctorProfile.get('medical_history'),
    };

    dispatch({ type: UPDATE_PATIENT_PROFILE, payload: { body, token } } )
  }

  render() {
    const { doctorProfile, navigation, dispatch, token } = this.props;

    const fakeData = {
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
      name: '谢尔盖',
      hospital_name: '常德市第一人民医院',
    };

    // doctorProfile && doctorProfile.get('avatar') || null
    // doctorProfile && doctorProfile.get('name') && doctorProfile.get('name') || '还没填写姓名'

    return (
     <LinearGradient
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            colors={['#23BCBB', '#45E994']}
            style={styles.headerBox}>
          <View style={styles.topBox}>
                <TouchableOpacity onPress={() => { navigation.navigate('Setting', { doctorProfile, token, dispatch })}}>
                  <Image source={require('../img/setting.png')} style={styles.setting} />
                </TouchableOpacity>
              </View>
        
        {
          !doctorProfile && (
            <View>
              <View style={styles.bottomBox}>
                <View style={styles.leftBox}>
                  <SelectPhoto handleAddPic={this.handleAddPic} personInfo={true} avatar={fakeData.avatar} />
                </View>
                <View style={styles.rightBox}>
                  <Text style={styles.name}>{fakeData.name}</Text>
                  <Text style={styles.hospital}>{fakeData.hospital_name}</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate('DoctorPersonInfo', { token, doctorProfile, dispatch })}}>
                    <View style={styles.infoBox}>
                      <Image source={require('../img/pen.png')} />
                      <Text style={styles.info}>修改个人资料</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }


      </LinearGradient>
    )
  }
}


export default TabThreeHeaderSection;