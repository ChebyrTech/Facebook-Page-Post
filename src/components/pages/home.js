import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Front extends React.Component {

  render() {
    return (
      <div>
        <h1>Front page</h1>
        <hr/>
        <p>This is a front page</p>
        <Link to="/fb/">Facebook section</Link>
      </div>
    );
  }
}

