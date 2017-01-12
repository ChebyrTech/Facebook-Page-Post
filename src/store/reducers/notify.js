import * as ActionTypes from 'store/actions';

const initialState = {
    notifs: [],
};

export default function notifs(state = initialState, action)
{
    if (!action || !action.type) return state;

    switch (action.type)
    {
        case ActionTypes.NOTIF_SEND:
            return [action.payload, ...state.filter(({ id }) =>
            {
                return (id !== action.payload.id);
            })];
        case ActionTypes.NOTIF_DISMISS:
            return state.filter(notif =>
            {
                return (notif.id !== action.payload);
            });
        case ActionTypes.NOTIF_CLEAR:
            return [];
        default:
            return state;
    }
}
