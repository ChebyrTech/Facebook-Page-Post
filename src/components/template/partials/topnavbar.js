import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import * as A from '../../../actions/fb-auth';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class TopNavbar extends Component {

    logoout = () => {
        this.props.dispatch(A.fbLogout());
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
                    {this.props.fb_page.name ? 'Page: ' + this.props.fb_page.name + ' (' + this.props.fb_page.id + ')' : 'Page is not loaded.'}
                    {this.props.fb_page.name && !this.props.fb_page.access_token ? <span className="text-danger"> Error, no access to page.</span> : ''}
                </div>

                <Nav pullRight>
                    <IndexLinkContainer to="/"><MenuItem>Home</MenuItem></IndexLinkContainer>
                    <LinkContainer to="/fb"><MenuItem>Facebook</MenuItem></LinkContainer>
                    <LinkContainer to="/about-us"><MenuItem>About Us</MenuItem></LinkContainer>
                    {this.props.fb_user ?
                        <NavDropdown id="dropdown-1" title={'Hello ' + this.props.fb_user.name}>
                            <MenuItem onClick={this.logoout}>Logout</MenuItem>
                        </NavDropdown>
                        : ''}
                </Nav>
            </Navbar>
        );
    }
}

TopNavbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fb_user: PropTypes.object,
    fb_page: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        fb_user: state.fb.auth.user,
        fb_page: state.fb.auth.page,
        routing: state.routing, // Fix for active menu links (to update component when route was changed)
    };
}

export default connect(mapStateToProps)(TopNavbar);
