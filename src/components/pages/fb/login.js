import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as A from '../../../actions/fb-auth';
import { Link } from 'react-router';

class Login extends React.Component {

    login = (e) => {
        e.preventDefault();
        this.props.dispatch(A.fbLogin());
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <hr/>
                <p>
                    <a href="#" className="btn btn-primary" onClick={this.login}>Login with Facebook</a>
                </p>
                <p>
                    <Link to="/fb/privacy-policy">Privacy Policy</Link>
                </p>
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
