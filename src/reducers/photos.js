import merge from 'lodash/merge';

const initialState = {
  photos: [],
  uploadShow: false,
};

export function photos(state = initialState, action) {
  switch (action.type) {

    case 'UPLOAD_SHOW': return merge({}, state, { uploadShow: true });
    case 'UPLOAD_HIDE': return merge({}, state, { uploadShow: false });

    case 'LOAD_PHOTOS_OK':
      state.photos = action.photos;
      return merge({}, state);

    default:
      return state;
  }
}
