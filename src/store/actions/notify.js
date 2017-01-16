import * as ActionTypes from 'store/actions';

export default class NotifyActions
{
    /**
     * Publish a notification,
     * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
     * - if id wasn't specified, a time based id will be generated.``
     */
    static notifSend(message, kind, id, dismissAfter)
    {
        const payload = { id, message, kind, dismissAfter };
        if (!payload.id)
        {
            payload.id = new Date().getTime();
        }
        return { type: ActionTypes.NOTIF_SEND, payload };
    }

    /**
     * Dismiss a notification by the given id.
     */
    static notifDismiss(id)
    {
        return { type: ActionTypes.NOTIF_DISMISS, payload: id };
    }

    /**
     * Clear all notifications
     */
    static notifClear()
    {
        return { type: ActionTypes.NOTIF_CLEAR };
    }

    // Show error
    static success(message)
    {
        NotifyActions.notifSend(message, 'notif--success');
    }

    // Show notification
    static info(message)
    {
        NotifyActions.notifSend(message, 'notif--info');
    }

    // Show notification
    static warning(message)
    {
        NotifyActions.notifSend(message, 'notif--warning');
    }

    // Show notification
    static danger(message)
    {
        NotifyActions.notifSend(message, 'notif--danger');
    }
}
