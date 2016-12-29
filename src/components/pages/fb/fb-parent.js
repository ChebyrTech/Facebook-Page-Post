import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as I from '../../../store/actions/fb/init';
import * as A from '../../../store/actions/fb/auth';
import { push } from 'react-router-redux';

class FbParent extends Component {

    componentDidMount() {

        if (!this.props.user) {
            // Initialie FB SDK and check login

            // You can determine whether or not the FB library has loaded by looking at window.fbAsyncInit.hasRun. 
            // If window.fbAsyncInit.hasRun is true then the library has loaded (however, this doesn't indicate whether 
            // or not the FB.init() has been called yet).

            window.fbAsyncInit = () => {
                I.init();
            };

            // Load the SDK asynchronously
            I.loadSDK();


        } else {
            // Redirect to photos
            this.props.dispatch(push('/fb/photos'));
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

FbParent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.fb.auth.user,
    };
}

export default connect(mapStateToProps)(FbParent);
