import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as A from '../../actions/auth';

class Login extends React.Component {

  login = (e) => {
    e.preventDefault();
    this.props.dispatch(A.login());
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <hr/>
        <a href="#" className="btn btn-primary" onClick={this.login}>Login with Facebook</a>
      </div>
    );
  }
}


Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(Login);
