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
import { FinishedListItemStyle as styles } from '../../styles/';



class FinishedListItem extends PureComponent {

  handleBtn = () => {

  }

  render() {
    const { item } = this.props;

    let lastMessage = "每次洗完澡后记得局部要用护肤品哈哈哈哈或或";

    if (lastMessage.length > 13) {
      lastMessage = lastMessage.slice(0, 13) + '...';
    }

    const lastTime = '2017年7月15日';

    let ITEM = [];
    if (item.ratings && !isNaN(parseInt(ratings))) {
      for (let i = 0; i < parseInt(item.ratings); i++) {
        ITEM.push(
          <Image source={require('../img/smallHeart.png')} style={styles.img} />
        )
      }

      for (let i = 0; i < 5 - parseInt(item.ratings); i++) {
        ITEM.push(
          <Image source={require('../img/smallSolidHeart.png')} style={styles.img} />
        )
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.doctorAvatarBox}>
            <Image source={{ uri: item.avatar }} style={styles.doctorAvatar} />
          </View>
          <View style={styles.rightBox}>
              <View style={styles.nameBox}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastTime}>{lastTime}</Text>
              </View>
              <View style={styles.appraiseBox}>
                {
                  item.appraised 
                  ? (
                    <Text style={styles.unApparise}>该用户暂未评价</Text>
                  )
                  : (
                    <View style={styles.starBox}>
                      <View style={styles.heartBox}>
                        {
                          ITEM.map((item, key) => (
                            item
                          ))
                        }
                      </View>
                      <TouchableWithoutFeedback onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
                      <View style={styles.buttonBox}>
                        <Text style={[ styles.content, this.props.textStyle ]}>查看评论详情</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    </View>
                  )
                }
              </View>
            </View>
        </View>
      </View>
    )
  }
}

export default FinishedListItem;