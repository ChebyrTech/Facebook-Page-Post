import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-css-transition-group';
import Notif from './Notif';

// This checks to see if object is immutable and properly access it
const getter = (obj, propName) => (obj.get ? obj.get(propName) : obj[propName]);

class Notifs extends Component
{
    constructor()
    {
        super();

        const transitionEnterTimeout = 600;
        const transitionLeaveTimeout = 600;
        const classes = `notif__container`;
    }

    render()
    {
        let notifications = this.props.notifications;
        const renderedNotifications = notifications.map((notification) =>
        {
            return (
                <Notif
                    {...props}
                    key={getter(notification, 'id') }
                    id={getter(notification, 'id') }
                    message={getter(notification, 'message') }
                    kind={getter(notification, 'kind') }
                    />
            );
        });

        return (
            <div className={this.classes} >
                <TransitionGroup
                    transitionName='notif-transition'
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={600}
                    >
                    {renderedNotifications}
                </TransitionGroup>
            </div>
        );
    }
}

Notifs.propTypes = {
    notifications: React.PropTypes.array.isRequired,
};

function mapStateToProps(state)
{
    return {
        notifications: state.notify.notifs,
    };
}

export default connect(mapStateToProps)(Notifs);