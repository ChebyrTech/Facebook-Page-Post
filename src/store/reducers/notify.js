import * as ActionTypes from 'store/actions/types';

const initialState = {
    notifs : [],
};

export default function notifs(state = initialState, action)
{
    if (!action || !action.type) return state;

    switch (action.type)
    {
        case ActionTypes.NOTIF_SEND:
            return [action.payload, ...state.filter(({ id }) => id !== action.payload.id)];
        case ActionTypes.NOTIF_DISMISS:
            return state.filter(notif =>
                notif.id !== action.payload
            );
        case ActionTypes.NOTIF_CLEAR:
            return [];
        default:
            return state;
    }
}