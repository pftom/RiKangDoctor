import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation';

import AppWithNavigationState from './navigators/AppNavigator';
import { UserNavigator } from './navigators/AppNavigator';
import { addNavigationHelpers } from 'react-navigation';

import BasicDataFirst from './components/BasicDataFirst';


import Practice from './components/practice';

import {} from './selectors';

class App extends Component {
  render() {
    const { isLoggedIn, authCodeStatus, dispatch } = this.props;
    if (!isLoggedIn) {
      return <UserNavigator />
    }
    if (isLoggedIn && authCodeStatus === 1) {
      return <BasicDataFirst />
    }
    return <AppWithNavigationState navigation={addNavigationHelpers()}/>
  }
}

export default App;
