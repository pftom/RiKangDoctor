import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

//import style
import { HeaderSectionStyle as styles } from '../../styles/';

import LinearGradient from 'react-native-linear-gradient';


import { UPDATE_PATIENT_PROFILE } from '../../../constants/';


class TabOneHeaderSection extends PureComponent {

  handleAddPic = (img) => {
    const { dispatch, token, patientProfile } = this.props;

    let body = {
      name: patientProfile.get('name') || '无',
      avatar: img,
      age: isNaN(parseInt(patientProfile.get('age'))) ? 18 : parseInt(patientProfile.get('age')),
      sex: patientProfile.get('sex') || 'U',
      medical_history: patientProfile.get('medical_history'),
    };

    dispatch({ type: UPDATE_PATIENT_PROFILE, payload: { body, token } } )
  }

  render() {
    const { patientProfile, navigation, dispatch, token } = this.props;
    return (
     <LinearGradient
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            colors={['#23BCBB', '#45E994']}
            style={styles.headerBox}>

      </LinearGradient>
    )
  }
}


export default TabOneHeaderSection;