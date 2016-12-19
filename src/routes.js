import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import PhotosPage from './components/pages/fb/photos';
import LoginPage from './components/pages/fb/login';
import Template from './components/template/template';
import Home from './components/pages/home';
import FbParent from './components/pages/fb/fb-parent';
import Page404 from './components/pages/page404';
import FbPrivacyPolicy from './components/pages/fb/privacy-policy';
import AboutUs from './components/pages/about-us';

class Routes extends Component {

  shouldComponentUpdate() {
    // Disable component re-render caused by redux state change (Routes are static)
    return false;
  }

  checkFbAuth = (nextState, replace) => {
    if ( ! this.props.fb_user) {
      replace('/fb/');
    }
  };

  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={Template}>
          <IndexRoute component={Home} />
          <Route path="about-us" component={AboutUs} />

          <Route path="fb" component={FbParent}>
            <IndexRoute component={LoginPage} />
            <Route path="privacy-policy" component={FbPrivacyPolicy} />
            <Route path="photos" component={PhotosPage} onEnter={this.checkFbAuth}  />
          </Route>

          <Route path='*' component={Page404} />
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
    fb_user: state.fb.auth.user,
  };
}

export default connect(mapStateToProps)(Routes);
