import * as ActionTypes from 'store/actions/types';

/**
 * Publish a notification,
 * - if `dismissAfter` was set, the notification will be auto dismissed after the given period.
 * - if id wasn't specified, a time based id will be generated.``
 */
export function notifSend(id, message, kind, dismissAfter)
{
    const payload = { id, message, kind, dismissAfter };
    if (!payload.id)
    {
        payload.id = new Date().getTime();
    }
    dispatch({ type: ActionTypes.NOTIF_SEND, payload });
}

/**
 * Dismiss a notification by the given id.
 */
export function notifDismiss(id)
{
    return { type: ActionTypes.NOTIF_DISMISS, payload: id };
}

/**
 * Clear all notifications
 */
export function notifClear()
{
    return { type: ActionTypes.NOTIF_CLEAR };
}