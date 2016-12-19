import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as A from '../../../actions/fb-auth';
import { push } from 'react-router-redux';

class FbParent extends Component {

  componentDidMount() {

    if ( ! this.props.user) {
      // Initialie FB SDK and check login

      window.fbAsyncInit = () => {
        FB.init({
          appId: Config.FACEBOOK_APP_ID,
          cookie: true,  // enable cookies to allow the server to access
          xfbml: true,  // parse social plugins on this page
          version: 'v2.8'
        });

        this.props.dispatch(A.fbLoginStatus());
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

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
