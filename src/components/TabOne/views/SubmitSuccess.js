import React, { PureComponent } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView, 
  StatusBar,
  Animated,
  Image,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

//import async action constants
import { 
  GO_HOME,
} from '../../../constants/';

//import selector for computing data
import { getPostSelector } from '../../../selectors/';

//import post style
import { SubmitSuccessStyle as styles } from '../../styles/';



class SubmitSuccess extends PureComponent {

  handleBtn = (kind) => {
    const { navigation, dispatch } = this.props;
    if (kind === 'home') {
      dispatch({ type: GO_HOME });
    } else if (kind === 'info') {
      navigation.navigate('DoctorInfo', { token, dispatch })
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Image source={require('../img/submitSuccess.png')} />
          <Text style={styles.title}>提交成功</Text>
          <Text style={styles.hintText}>日康会在三个工作日内对您的资料进行审核并将结果通知您。您现在可以填写个人详细资料，或是进入首页。</Text>

          <TouchableWithoutFeedback onPress={() => { this.handleBtn('info') }} style={styles.buttonContainer}>
            <View style={styles.buttonBox}>
              <Text style={[ styles.content, this.props.textStyle ]}>填写详细资料</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => { this.handleBtn('home') }} style={[ styles.buttonContainer, styles.extraButtonContainer ]}>
            <View style={[ styles.buttonBox, styles.extraButtonBox ]}>
              <Text style={[ styles.content, styles.extraContent ]}>进入首页</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default connect()(SubmitSuccess);