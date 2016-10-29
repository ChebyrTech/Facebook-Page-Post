import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PhotosPage from '../pages/photos';
import LoginPage from '../pages/login';
import TopNavbar from './topnavbar';
import Spinner from 'react-spinkit';

class Template extends Component {
  render() {
    return (
      <div>
        <TopNavbar />
        <div className="container">
          {this.props.user ? <PhotosPage /> : <LoginPage />}
        </div>
        <div className={'main-spinner' + (this.props.loading ? ' active' : '')}>
          <div className="middle">
            <div className="middle-inner">
              <Spinner spinnerName='three-bounce' noFadeIn />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Template.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    loading: state.general.loading,
  };
}

export default connect(mapStateToProps)(Template);
