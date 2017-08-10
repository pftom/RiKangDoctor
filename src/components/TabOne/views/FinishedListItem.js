import React, { PureComponent } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView, 
  StatusBar,
  Animated,
  Image,
  TouchableHighlight,
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
    console.log('item', item.comment && item.comment.toJS());

    let ITEM = [];
    if (item.comment.get('ratings') && !isNaN(parseInt(item.comment.get('ratings')))) {
      for (let i = 0; i < parseInt(item.comment.get('ratings')); i++) {
        ITEM.push(
          <Image source={require('../img/smallHeart.png')} style={styles.img} key={i} />
        )
      }

      for (let i = 0; i < 5 - parseInt(item.comment.get('ratings')); i++) {
        ITEM.push(
          <Image source={require('../img/smallSolidHeart.png')} style={styles.img} key={5 - i} />
        )
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.doctorAvatarBox}>
            <Image source={{ uri: item.service_object.patient.avatar }} style={styles.doctorAvatar} />
          </View>
          <View style={styles.rightBox}>
              <View style={styles.nameBox}>
                <Text style={styles.name}>{item.service_object.patient.name}</Text>
              </View>
              <View style={styles.appraiseBox}>
                {
                  !item.comment 
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

                    //   <TouchableHighlight onPress={() => { this.handleBtn() }} style={styles.buttonContainer}>
                    //   <View style={styles.buttonBox}>
                    //     <Text style={[ styles.content, this.props.textStyle ]}>查看评论详情</Text>
                    //   </View>
                    // </TouchableHighlight>