import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ActionCreator from 'store/actions/creator';

import { push } from 'react-router-redux';

class FbParent extends Component {

    componentDidMount() {

        if (!this.props.user) {
            // Initialie FB SDK and check login
            dispatch(ActionCreator.loadFacebookSDK());
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
};

function mapStateToProps(state) {
    return {
        user: state.fb.auth.user,
    };
}

export default connect(mapStateToProps)(FbParent);
