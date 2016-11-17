import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import PhotosPage from './components/pages/photos';
import LoginPage from './components/pages/login';
import Template from './components/template/template';
import * as A from './actions/auth';

class Routes extends Component {

  componentDidMount() {
    // Fire login status check action when component was mounted
    this.props.dispatch(A.loginStatus());
  }

  shouldComponentUpdate() {
    // Disable component re-render caused by redux state change (Routes are static)
    return false;
  }

  checkAuth = (nextState, replace) => {
    if ( ! this.props.user) {
      replace('/');
    }
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Template}>
          <IndexRoute component={LoginPage} />
          <Route path="photos" component={PhotosPage} onEnter={this.checkAuth}  />
        </Route>
      </Router>
    );
  }
}

Routes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Routes);
