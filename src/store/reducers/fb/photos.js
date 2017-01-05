import merge from 'lodash/merge';
import * as ActionTypes from 'store/actions/types';

const initialState = {
    photos: [],
    uploadShow: false,
};

export function photos(state = initialState, action) {
    switch (action.type) {

        case ActionTypes.FB_UPLOAD_SHOW: return merge({}, state, { uploadShow: true });
        case ActionTypes.FB_UPLOAD_HIDE: return merge({}, state, { uploadShow: false });

        case ActionTypes.FB_LOAD_PHOTOS_OK:
            state.photos = action.photos;
            return merge({}, state);

        default:
            return state;
    }
}
