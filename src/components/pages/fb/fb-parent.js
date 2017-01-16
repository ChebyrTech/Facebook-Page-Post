import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FacebookActions from 'store/actions/facebook';

import { push } from 'react-router-redux';

class FbParent extends Component
{
    componentDidMount()
    {
        if (!this.props.user) {
            // Initialie FB SDK and check login
            this.props.dispatch(FacebookActions.loadFacebookSDK());
        }
        else {
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
    children: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        user: state.facebook.user,
    };
}

export default connect(mapStateToProps)(FbParent);
