import merge from 'lodash/merge';

const initialState = {
  loading: false,
};

export function general(state = initialState, action) {
  switch (action.type) {

    case 'LOADING':
    case 'LOGIN':
    case 'LOAD_PHOTOS':
    case 'UPLOAD_PHOTO':
      return merge({}, state, { loading: true });

    case 'STOP_LOADING':
    case 'ERROR':
    case 'LOGIN_STATUS_OK':
    case 'LOGIN_OK':
    case 'LOAD_PHOTOS_OK':
    case 'UPLOAD_PHOTO_OK':
      return merge({}, state, { loading: false });

    default: return state;
  }
}
