import merge from 'lodash/merge';

const initialState = {
    loading: false,
};

export function general(state = initialState, action) {
    switch (action.type) {

        case 'LOADING':
        case 'FB_LOGIN':
        case 'FB_LOAD_PHOTOS':
        case 'FB_UPLOAD_PHOTO':
            return merge({}, state, { loading: true });

        case 'STOP_LOADING':
        case 'ERROR':
        case 'FB_LOGIN_STATUS_OK':
        case 'FB_LOGIN_OK':
        case 'FB_LOAD_PHOTOS_OK':
        case 'FB_UPLOAD_PHOTO_OK':
            return merge({}, state, { loading: false });

        default: return state;
    }
}
