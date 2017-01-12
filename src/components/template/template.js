import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TopNavbar from './partials/topnavbar';
import Spinner from 'react-spinkit';
import Notifs from './Notifs';

class Template extends Component {
    render() {
        return (
            <div>
                <TopNavbar />
                <div className="container">
                    {this.props.children}
                </div>
                <div className={'main-spinner' + (this.props.appState ? ' active' : '') }>
                    <div className="middle">
                        <div className="middle-inner">
                            <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>
                    </div>
                </div>
                <Notifs />
            </div>
        );
    }
}

Template.propTypes = {
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.object,
    appState: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        appState: state.facebook.appState,
    };
}

export default connect(mapStateToProps)(Template);
