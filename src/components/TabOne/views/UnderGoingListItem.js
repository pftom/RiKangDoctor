import React, { PureComponent } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  ScrollView, 
  StatusBar,
  Animated,
  Image,
  Platform,
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
import { UnderGoingListItemStyle as styles } from '../../styles/';

export function getNowTime(item) {
  const now = new Date(item._lastMessageAt);

  const hour = now.getHours();
  const minute = now.getMinutes();

  const nowTime = `${hour}:${minute}`;

  return nowTime;
}


class UnderGoingListItem extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      normalConv: [],
    }
  }

  componentDidMount() {

    this.getConversations();
  }

  getNormalConvs = () => {
    const {  LeanRT, navigation, item } = this.props;

    const patientId = item.service_object.patient.id;
    const clientId = item.service_object.doctor;
    const imClient = LeanRT.imClient;

    console.log('clientId', clientId, patientId)
    console.log('imClient', imClient);
    if (imClient && imClient.getQuery) {
      return imClient.getQuery().withLastMessagesRefreshed(true).containsMembers([String(clientId), String(patientId)]).find();
    }
  }

  getConversations = () => {
    const that = this;

    const convs =  this.getNormalConvs()
    
    if (convs) {
      return convs.then((data) => {
        that.setState({
          normalConv: data,
        });
      })
    }
  }

  handleBtn = () => {

  }

  handleChat(patientId) {
    const { navigation, LeanRT, userId, item } = this.props;

    const clientId = item.service_object.doctor;
    const imClient = LeanRT.imClient;
    
    return imClient.createConversation({
      members: [String(patientId)],
      name: `${String(patientId)} 和 ${imClient.id}的对话`,
      transient: false,
      unique: true,
    }).then(conversation => {
      const SELECT = {
        'ios': 'TestRNIMUI',
        'android': 'TestRNIMUIAndroid'
      };
      navigation.navigate(SELECT[Platform.OS], { clientId, patientId, imClient: imClient, conv: conversation })
    }).catch(console.error.bind(console));
  }

  render() {
    const { item, navigation, dispatch } = this.props;

    const { normalConv } = this.state;
    console.log('normalConv', normalConv);

    const patientId = item.service_object.patient.id;

    let lastMessage = '';
    let lastTime = '';

    if (normalConv.length > 0) {
      const message = normalConv[0].lastMessage;

      if (!message._lcfile && message._lctext !== 'data:image/jpeg;base64,') {
        lastMessage = message._lctext;
      } else if (message._lcfile && message._lctext === 'data:image/jpeg;base64,') {
        lastMessage = '发来了一张图片...';
      } else if (message._lcfile && message._lctext === "data:audio/m4a;base64,") {
        lastMessage = '发来了一段语音...';
      }

      lastTime = getNowTime(normalConv[0]);
    }

    if (lastMessage.length > 13) {
      lastMessage = lastMessage.slice(0, 13) + '...';
    }

    return (
    <TouchableOpacity onPress={() => { this.handleChat(patientId) }}>
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
              <Text style={styles.lastMessage}>{lastMessage}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
}

export default UnderGoingListItem;