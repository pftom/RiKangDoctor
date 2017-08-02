import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import { Toast } from 'antd-mobile';

//import constants
import { CLEAR_FAV_STATE } from '../../constants/'


//import style
import { QuestionListStyle as styles } from '../TabTwo/styles/';


class TagBox extends PureComponent {

  handleTouch = () => {
    const { star, help, comment, btnText } = this.props;
    
    if (star) {
      this.props.handleNavigation();
    }
  }
  
  render() {
    const { navigation, token, item } = this.props;

    //get judge condition
    const { star, help, comment, btnText } = this.props;

    const mapImg = star ? require('./img/plus.png') : require('./img/leftArrow.png');

    let renderText = null;

    return (
      <View style={[ styles.tagBox, comment && styles.commentBox]}>
          {
            star && (
              <View style={styles.leftBox}>
                <Text style={styles.starsAndAnswer}>{item.stars} 人关注</Text>
                <View style={styles.dot}></View>
                <Text style={styles.starsAndAnswer}>{item.answer_num} 条回答</Text>
              </View>
            )
          }


          {
            help && (
              <TouchableOpacity onPress={() => { navigation.navigate('CommentList', { token, id: item.id }) }}>
                <View style={[ styles.leftBox]}>
                  <Image source={require('../TabOne/img/comment.png')} />
                  <Text style={styles.upvote}>{item.comment_num || ''}</Text>
                </View>
              </TouchableOpacity>
            )
          }

          {
            (star || comment || help) && (
              <View style={styles.rightBox}>
                <TouchableHighlight onPress={() => { this.handleTouch() }} style={styles.btnContainer}>
                  <View style={[ styles.starBtn, this.state.starred && styles.starredBtn ]}>
                    {
                      ((star || comment) && !this.state.starred) && (
                        <Image source={mapImg} style={styles.img} />
                      )
                    }
                    <Text style={styles.starText}>{renderText}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            )
          }
          
      
      </View>
     )
    }
}

export default TagBox;