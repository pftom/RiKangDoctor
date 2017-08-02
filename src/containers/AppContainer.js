import { connect } from 'react-redux';

import App from '../App';

const mapStateToProps = function mapStateToProps(state) {
  return {
    isLoggedIn: state.getIn(['auth', 'isLoggedIn']),
    authCodeStatus: state.getIn(['auth', 'authCode', 'status']),
  };
};

export default connect(mapStateToProps)(App);