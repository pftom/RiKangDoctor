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
          doctorProfile && (
            <View>
              
              <View style={styles.bottomBox}>
                <View style={styles.leftBox}>
                  <SelectPhoto handleAddPic={this.handleAddPic} personInfo={true} avatar={doctorProfile && doctorProfile.get('avatar') || null} />
                </View>
                <View style={styles.rightBox}>
                  <Text style={styles.name}>{doctorProfile && doctorProfile.get('name') && doctorProfile.get('name') || '还没填写姓名'}</Text>
                  <TouchableOpacity onPress={() => { navigation.navigate('PatientPersonInfo', { token, doctorProfile, dispatch })}}>
                    <View style={styles.infoBox}>
                      <Text style={styles.info}>个人信息</Text>
                      <Image source={require('../img/rightArrow.png')} />
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