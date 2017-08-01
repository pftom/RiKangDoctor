import React, { PureComponent } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView, 
  StatusBar,
  Animated,
  Image,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

//import async action constants
import { 
  GET_SINGLE_POST,
  ADD_SINGLE_POST_FAV,
  CANCEL_SINGLE_POST_FAV,
} from '../../../constants/';

//import selector for computing data
import { getPostSelector } from '../../../selectors/';

//import post style
import { NewOrderListItemStyle as styles } from '../../styles/';



class FinishedListItem extends PureComponent {

  handleBtn = () => {

  }

  render() {

    let lastTime = "接受（剩余1小时48分）";

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.idBox}>
            <View style={styles.doctorAvatarBox}>
              <Image source={{ uri: item.avatar }} style={styles.doctorAvatar} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.consult}>向您发出咨询请求</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <Text style={[ styles.content, this.props.textStyle ]}>{lastTime}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default FinishedListItem;