import React, { PureComponent } from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

//import style
import { HeaderSectionStyle as styles } from '../../styles/';

import LinearGradient from 'react-native-linear-gradient';


import { UPDATE_PATIENT_PROFILE } from '../../../constants/';


class TabOneHeaderSection extends PureComponent {

  render() {
    return (
     <LinearGradient
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            colors={['#23BCBB', '#45E994']}
            style={styles.headerBox}>
        <Text style={styles.consult}>在线咨询</Text>
      </LinearGradient>
    )
  }
}


export default TabOneHeaderSection;