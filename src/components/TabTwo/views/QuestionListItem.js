import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';
//import selector for questionFav data
import { getQuestionFavSelector } from '../../../selectors/';


//import style
import { QuestionListStyle as styles } from '../styles/';

//import selector
import { getQuestionListSelector } from '../../../selectors/';

//import tag box
import { TagBox } from '../../common/';

//import action constants
import {
  STAR_SINGLE_QUESTION,
  CANCEL_STAR_SINGLE_QUESTION,
} from '../../../constants/';

class QuestionListItem extends PureComponent {
  
  render() {
    const { navigation, token, item, dispatch, question } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => { navigation.navigate('QuestionDetail', { id: item.key, token })}} style={styles.touchBox}>
        <View style={styles.container}>
            <View style={styles.QuestionBox}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.tagContainer}>
                <TagBox 
                  star={true} 
                  item={item} 
                  btnText={"回答"}
                  navigation={navigation}
                  token={token}
                  dispatch={dispatch}
                  handleNavigation={() => { navigation.navigate('QuestionDetail', { id: item.key, token })} }
                />
              </View>
            </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default connect(
  state => getQuestionListSelector(state),
)(QuestionListItem);