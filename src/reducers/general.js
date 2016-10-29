import merge from 'lodash/merge';

const initialState = {
  uploadShow: false,
  loading: true,
};

export function general(state = initialState, action) {
  switch (action.type) {

    case 'UPLOAD_SHOW': return merge({}, state, { uploadShow: true });
    case 'UPLOAD_HIDE': return merge({}, state, { uploadShow: false });

    case 'LOGIN':
    case 'LOAD_PHOTOS':
    case 'UPLOAD_PHOTO':
      return merge({}, state, { loading: true });

    case 'ERROR':
    case 'LOGIN_STATUS_OK':
    case 'LOGIN_OK':
    case 'LOAD_PHOTOS_OK':
    case 'UPLOAD_PHOTO_OK':
      return merge({}, state, { loading: false });

    default: return state;
  }
}
