import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import * as A from '../../actions/auth';

class TopNavbar extends Component {

  logoout = () => {
    this.props.dispatch(A.logout());
  };

  render() {
    return (
      <Navbar inverse className="navbar-static-top">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>

        <div className="navbar-text">
            {this.props.page.name ? 'Page: ' + this.props.page.name + ' (' + this.props.page.id + ')' : 'Page is not loaded.'}
            {this.props.page.name && ! this.props.page.access_token ? <span className="text-danger"> Error, no access to page.</span> : ''}
        </div>

        {this.props.user ?
          <Nav pullRight>
            <NavDropdown id="dropdown-1" eventKey={3} title={'Hello ' + this.props.user.name}>
              <MenuItem eventKey={3.1} onClick={this.logoout}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
          : ''}
      </Navbar>
    );
  }
}

TopNavbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    page: state.auth.page,
  };
}

export default connect(mapStateToProps)(TopNavbar);
