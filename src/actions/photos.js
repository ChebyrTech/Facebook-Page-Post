import * as Config from '../config';
import { error } from './general';
import { postImage } from '../helpers/fb-upload';

/**
 * Load photos
 */
export function loadPhotos() {
  return (dispatch, getState) => {

    FB.api('/' + Config.FACEBOOK_PAGE_ID + '/photos',
      {fields: 'images, name', type: 'uploaded', limit: Config.PHOTOS_LIMIT}, (result) => {
        if (result.error) {
          dispatch(error(result.error.message));
        } else {
          dispatch({
            type: 'LOAD_PHOTOS_OK',
            photos: result.data,
          });
        }
      });

    dispatch({
      type: 'LOAD_PHOTOS',
    });
  }
}

/**
 * Upload photo
 */
export function upload({image, description}) {
  return (dispatch, getState) => {

    if ( ! getState().auth.page.access_token) {
      dispatch(error('Page access token is not loaded'));

      return;
    }

    postImage({
      apiUrl: '/' + Config.FACEBOOK_PAGE_ID + '/photos',
      accessToken: getState().auth.page.access_token,
      image,
      description,
      success: (result) => {
        dispatch({
          type: 'UPLOAD_PHOTO_OK',
        });

        dispatch({type: 'UPLOAD_HIDE'});
        dispatch(loadPhotos());
      },
      error: (response) => {
        dispatch(error(response.message));
      }
    });

    dispatch({
      type: 'UPLOAD_PHOTO',
    });
  }
}
