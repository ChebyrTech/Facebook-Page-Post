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
        const HOME = '/';
        const FACEBOOK_HOME = '/fb/';

        const FACEBOOK_CHILD = 'fb';
        const FACEBOOK_PRIVACY_POLICY = 'privacy-policy';
        const FACEBOOK_PHOTOS = 'photos';

        const ABOUT_US = 'about-us';
        const UNKNOWN = '*';
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
                <Route path= {HOME} component={Template}>
                    <IndexRoute component={Home} />
                    <Route path={ABOUT_US} component={AboutUs} />

                    <Route path={FACEBOOK_CHILD} component={FbParent}>
                        <IndexRoute component={LoginPage} />
                        <Route path={FACEBOOK_PRIVACY_POLICY} component={FbPrivacyPolicy} />
                        <Route path={FACEBOOK_PHOTOS} component={PhotosPage} onEnter={this.checkFbAuth}  />
                    </Route>

                    <Route path={UNKNOWN} component={Page404} />
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
