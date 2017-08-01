import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform, } from 'react-native';
import { connect } from 'react-redux';


import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import CustomTabBar from '../../TabOne/views/CustomTabBar';
import UltimateListView from '../../common/UltimateListView';

//import fav doc
import NearByDoctorSection from '../../TabOne/views/NearByDoctorSection';
//import post section 
import PostSection from '../../TabOne/views/PostSection';
//import problem item
import ProblemItem from './ProblemItem';
//import Service item
import PaidServiceItem from './PaidServiceItem';
//IMPORT underway service item
import ServiceItem from './ServiceItem'

//import px to dp 
import px2dp from '../../../utils/px2dp';

import newOrder from './newOrder';

//import action constants
import { 
  GET_PATIENT_PROFILE,
  GET_PATIENT_FAV_DOCTORS,
  GET_PATIENT_FAV_POSTS,
  GET_PATIENT_QUESTIONS,
  GET_PATIENT_STARRED_QUESTIONS,
  GET_PATIENT_SERVICES,
 } from '../../../constants/'

//import selector from select data
import { getPatientSelector } from '../../../selectors/';

import TabThreeHeaderSection from './TabThreeHeaderSection';

//use fake data

//import handle data func
import {
  handleUserData,
  ITEMS,
  jumpToScreenLists,
} from '../data/'

import {
  handleNearby,
  handleHealthPost,
} from '../../TabOne/data/TabOneMainScreen_data.js'



class UserScreen extends PureComponent {

  componentDidMount() {

    const { dispatch, navigation, token } = this.props;

    // dispatch({ type: GET_PATIENT_STARRED_QUESTIONS, payload: { token } });
    // dispatch({ type: GET_PATIENT_SERVICES, payload: { token } });
  } 

  render() {
    const { dispatch, navigation, token,  patientProfile  } = this.props;
    //get faved data
    const { postFav, doctorFav, questionFav, questionStarredFav, servicesFav } = this.props;
    //get fetch data
    const { postFetch } = this.props;

    let patientUnderWayServicesData = {
      data: [],
      count: 0,
    };
    let patientPaidServicesData = {
      data: [],
      count: 0,
    };
    let patientFinishedServicesData = {
      data: [],
      count: 0,
    };
    //service for later handle
    // if (patientServices) {
    //   patientUnderWayServicesData = handleUserData(patientServices.get('results'), 'services', 'underway');
    //   patientPaidServicesData = handleUserData(patientServices.get('results'), 'services', 'paid')
    //   patientFinishedServicesData = handleUserData(patientServices.get('results'), 'services', 'finished');
    // }

    
    
    return (
      <View style={{ flex: 1, backgroundColor: '#F5F6F7'}}>
        {
          <TabThreeHeaderSection 
            patientProfile={patientProfile} 
            navigation={navigation}
            token={token}
            dispatch={dispatch}
          />
        }
        <ScrollableTabView
          page={0}
          style={ Platform.OS === 'ios' ? { marginTop: px2dp(148) } : { marginTop: px2dp(147) }}
          renderTabBar={
            () => <CustomTabBar 
                      multiCustom={true} 
                      underlineStyle={
                        Platform.OS === 'ios'
                        ? { marginLeft: px2dp(28) }
                        : { marginLeft: 0 }
                      }
                      tabTextStyle={{
                        fontSize: px2dp(18),
                      }}
                  />
          }
        >
          {
            ITEMS.map((item, key) => (
              <UltimateFlatList
              listData={nearbyDoctor}
              method={GET_DOCTORS}
              data={doctors}
              enableRefresh={true}
              refreshMethod={[ GET_DOCTORS ]}
              dispatch={this.props.dispatch}
              token={token}
              footText={"到底了哦"}
              renderItem={(item) => <DoctorListItem token={token} navigation={navigation} item={item} />}
          />
            ))
          }
        </ScrollableTabView>
      </View>
    )
  }
}

export default connect(
  state => getPatientSelector(state),
)(UserScreen);
