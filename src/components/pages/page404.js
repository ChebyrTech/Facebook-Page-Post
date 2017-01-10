import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Front extends React.Component
{
    render() {
        return (
            <div>
                <h1>Page not found</h1>
                <hr />
                <p>This page was not found</p>
                <Link to="/">To main page</Link>
            </div>
        );
    }
}

