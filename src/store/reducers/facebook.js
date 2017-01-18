import merge from 'lodash/merge';
import * as ActionTypes from 'store/actions';

const initialState = {
    appState: null,
    appStateDesc: null,
    authResponse: null,
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

export default function facebook(state = initialState, action) {
    switch (action.type)
    {
        case ActionTypes.FB_LOAD_SDK:
            return merge({}, state, initialState, { appState: action.type, appStateDesc: 'Loading Facebook SDK' });

        case ActionTypes.FB_LOAD_SDK_OK:
            return merge({}, state, { appState: action.type, appStateDesc: 'Facebook SDK Loaded' });

        case ActionTypes.FB_LOAD_SDK_ERR:
            return merge({}, state, { appState: action.type, appStateDesc: 'Error Loading Facebook SDK' });

        case ActionTypes.FB_INIT:
            return merge({}, state, { appState: action.type, appStateDesc: 'Initializing Facebook app' });

        case ActionTypes.FB_INIT_OK:
            return merge({}, state, { appState: action.type, appStateDesc: 'Facebook App Initialized' });

        case ActionTypes.FB_INIT_ERR:
            return merge({}, state, { appState: action.type, appStateDesc: 'Facebook App Initialization error' });

        case ActionTypes.FB_USER_CONNECTED:
            return merge({}, state, { authResponse: action.authResponse });

        case ActionTypes.FB_USER_NOT_AUTHORIZED:
            return merge({}, state, { authResponse: null });

        case ActionTypes.FB_USER_UNKNOWN:
            return merge({}, state, { authResponse: null });

        case ActionTypes.FB_USER_PROFILE_OK:
            return merge({}, state, { user: action.user });

        case ActionTypes.FB_USER_PROFILE_ERR:
            return merge({}, state, { user: null });

        case ActionTypes.FB_LOGOUT_OK:
            return merge({}, state, { user: null });

        case ActionTypes.FB_LOAD_PAGE_OK:
            return merge({}, state, { page: action.page });

        case ActionTypes.FB_LOAD_PHOTOS:
            return merge({}, state, { appState: action.type, appStateDesc: 'Load Facebook Photos' });

        case ActionTypes.FB_LOAD_PHOTOS_OK:
            return merge({}, state, { photos: action.photos });

        case ActionTypes.FB_LOAD_PHOTOS_ERR:
            return merge({}, state, { appState: action.type, appStateDesc: 'Load Facebook Photos Error' });

        case ActionTypes.FB_UPLOAD_PHOTO:
            return merge({}, state, { appState: action.type, appStateDesc: 'Read and Upload Photo from file' });

        case ActionTypes.FB_UPLOAD_PHOTO_OK:
            return merge({}, state, { appState: action.type, appStateDesc: 'Upload Facebook Photo OK' });

        case ActionTypes.FB_UPLOAD_PHOTO_ERR:
            return merge({}, state, { appState: action.type, appStateDesc: 'Upload Facebook Photo Error' });

        case ActionTypes.FB_UPLOAD_SHOW:
            return merge({}, state, { uploadShow: true });

        case ActionTypes.FB_UPLOAD_HIDE:
            return merge({}, state, { uploadShow: false });

        default:
            return state;
    }
}
