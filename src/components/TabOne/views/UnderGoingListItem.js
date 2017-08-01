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



class UnderGoingListItem extends PureComponent {

  handleBtn = () => {

  }

  render() {

    let lastMessage = "每次洗完澡后记得局部要用护肤品哈哈哈哈或或";

    if (lastMessage.length > 13) {
      lastMessage = lastMessage.slice(0, 13) + '...';
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.idBox}>
            <View style={styles.doctorAvatarBox}>
              <Image source={{ uri: item.avatar }} style={styles.doctorAvatar} />
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.lastMessage}>{lastMessage}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default UnderGoingListItem;