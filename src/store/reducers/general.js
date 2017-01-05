import merge from 'lodash/merge';
import * as ActionTypes from 'store/actions/types';

const initialState = {
    loading: false,
};

export function general(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.LOADING:
        case ActionTypes.FB_LOGIN:
        case ActionTypes.FB_LOAD_PHOTOS:
        case ActionTypes.FB_UPLOAD_PHOTO:
            return merge({}, state, { loading: true });

        case ActionTypes.STOP_LOADING:
        case ActionTypes.ERROR:
        case ActionTypes.FB_LOGIN_STATUS_OK:
        case ActionTypes.FB_LOGIN_OK:
        case ActionTypes.FB_LOAD_PHOTOS_OK:
        case ActionTypes.FB_UPLOAD_PHOTO_OK:
            return merge({}, state, { loading: false });

        default: return state;
    }
}
