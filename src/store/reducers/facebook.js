import merge from 'lodash/merge';
import * as ActionTypes from 'store/actions';

const initialState = {
    appState: null,
    userState: null,
    user: null,
    page: {
        id: null,
        name: null,
        access_token: null,
    },
    photos: [],
    uploadShow: false,
};

export function auth(state = initialState, action) {
    switch (action.type)
    {
        case ActionTypes.FB_LOAD_SDK:
            return merge({}, state, initialState, { appState: 'Loading Facebook SDK' });

        case ActionTypes.FB_LOAD_SDK_OK:
            return merge({}, state, { appState: 'Facebook SDK Loaded' });

        case ActionTypes.FB_LOAD_SDK_ERR:
            return merge({}, state, { appState: 'Error Loading Facebook SDK' });

        case ActionTypes.FB_INIT:
            return merge({}, state, { appState: 'Initializing Facebook app' });

        case ActionTypes.FB_INIT_OK:
            return merge({}, state, { appState: 'Facebook App Initialized' });

        case ActionTypes.FB_INIT_ERR:
            return merge({}, state, { appState: 'Facebook App Initialization error' });

        case ActionTypes.FB_USER_CONNECTED:
            return merge({}, state, initialState, { user: action.user });

        case ActionTypes.FB_USER_NOT_AUTHORIZED:
            return merge({}, state, initialState, { user: action.user });

        case ActionTypes.FB_USER_UNKNOWN:
            return merge({}, state, initialState, { user: action.user });

        case ActionTypes.FB_LOGOUT_OK:
            return merge({}, state, { user: null });

        case ActionTypes.FB_LOAD_PAGE_OK:
            return merge({}, state, { page: action.page });

        case ActionTypes.FB_UPLOAD_SHOW:
            return merge({}, state, { uploadShow: true });

        case ActionTypes.FB_UPLOAD_HIDE:
            return merge({}, state, { uploadShow: false });

        case ActionTypes.FB_LOAD_PHOTOS_OK:
            state.photos = action.photos;
            return merge({}, state);

        default:
            return state;
    }
}
