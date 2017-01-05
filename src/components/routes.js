import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import PhotosPage from './pages/fb/photos';
import LoginPage from './pages/fb/login';
import Template from './template/template';
import Home from './pages/home';
import FbParent from './pages/fb/fb-parent';
import Page404 from './pages/page404';
import FbPrivacyPolicy from './pages/fb/privacy-policy';
import AboutUs from './pages/about-us';

class Routes extends Component {

    constructor() {
        super();
        this.HOME = '/';
        this.FACEBOOK_HOME = '/fb/';

        this.FACEBOOK_CHILD = 'fb';
        this.FACEBOOK_PRIVACY_POLICY = 'privacy-policy';
        this.FACEBOOK_PHOTOS = 'photos';

        this.ABOUT_US = 'about-us';
        this.UNKNOWN = '*';
    }

    shouldComponentUpdate() {
        // Disable component re-render caused by redux state change (Routes are static)
        return false;
    }

    checkFbAuth (nextState, replace) {
        if (!this.props.fb_user) {
            replace(FACEBOOK_HOME);
        }
    };

    render() {
        return (
            <Router history={this.props.history}>
                <Route path= {this.HOME} component={Template}>
                    <IndexRoute component={Home} />
                    <Route path={this.ABOUT_US} component={AboutUs} />

                    <Route path={this.FACEBOOK_CHILD} component={FbParent}>
                        <IndexRoute component={LoginPage} />
                        <Route path={this.FACEBOOK_PRIVACY_POLICY} component={FbPrivacyPolicy} />
                        <Route path={this.FACEBOOK_PHOTOS} component={PhotosPage} onEnter={this.checkFbAuth}  />
                    </Route>

                    <Route path={this.UNKNOWN} component={Page404} />
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
