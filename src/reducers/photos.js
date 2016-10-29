import merge from 'lodash/merge';

const initialState = {
  photos: [],
};

export function photos(state = initialState, action) {
  switch (action.type) {

    case 'LOAD_PHOTOS_OK':
      state.photos = action.photos;
      return merge({}, state);

    default:
      return state;
  }
}
