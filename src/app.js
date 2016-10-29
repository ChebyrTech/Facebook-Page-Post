import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as A from './actions/auth';
import Template from './components/tamplate/template'
import { GrowlerContainer } from 'flash-notification-react-redux';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(A.loginStatus());
  }

  render() {
    return (
      <div>
        <Template />
        <GrowlerContainer />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps)(App);
