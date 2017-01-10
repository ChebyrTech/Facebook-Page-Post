import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FacebookActions from 'store/actions/facebook';

import { Link } from 'react-router';

class Login extends React.Component
{
    login(e)
    {
        e.preventDefault();
        this.props.dispatch(FacebookActions.fbLogin());
    }

    render()
    {
        return (
            <div>
                <h1>Login</h1>
                <hr />
                <p>
                    <a href="#" className="btn btn-primary" onClick={(e) => { this.login(e); }}>Login with Facebook</a>
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
