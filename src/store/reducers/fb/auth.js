import merge from 'lodash/merge';
import * as ActionTypes from 'store/actions/types';

const initialState = {
    user: null,
    page: {
        id: null,
        name: null,
        access_token: null
    },
};

export function auth(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.FB_LOGIN_STATUS_OK:
            return merge({}, state, initialState, {
                user: action.user,
            });

        case ActionTypes.FB_LOGIN_OK:
            return merge({}, state, {
                user: action.user,
            });

        case ActionTypes.FB_LOGOUT_OK:
            return merge({}, state, {
                user: null,
            });

        case ActionTypes.FB_LOAD_PAGE_OK:
            return merge({}, state, {
                page: action.page,
            });

        default:
            return state;
    }
}
