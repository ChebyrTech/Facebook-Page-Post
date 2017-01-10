import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Notif extends Component
{
    // const = ({ kind, actionLabel, onActionClick, id, message }) =>

    handleActionClick(ev)
    {
        ev.preventDefault();

        if (!this.onActionClick)
        {
            return;
        }

        this.onActionClick(this.id);
    }

    render()
    {
        return (
            <div className = "notif {this.kind}">
                <div className="notif__icon" />
                <div className= "notif__content">
                    <span className="{notif__message}" > { this.message }</span >
                </div >

                {this.actionLabel &&
                    <span className="notif__action">
                        <button onClick={this.handleActionClick}>{this.actionLabel}</button>
                    </span>
                }
                <div className="notif__close" />
            </div>
        );
    }
}

Notif.defaultProps = {
    kind: 'notif--info',
};

Notif.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
    ]).isRequired,
    message: React.PropTypes.string.isRequired,
    kind: React.PropTypes.oneOf([
        'notif--success',
        'notif--info',
        'notif--warning',
        'notif--danger',
    ]).isRequired,
    componentClassName: React.PropTypes.string,
    onActionClick: React.PropTypes.func,
    actionLabel: React.PropTypes.string,
};

export default Notif;
