import * as G from './general';
import { postImage } from '../helpers/fb-upload';

/**
 * Load photos
 */
export function fbLoadPhotos() {
    return (dispatch, getState) => {

        FB.api('/' + Config.FACEBOOK_PAGE_ID + '/photos',
            { fields: 'images, name, permalink_url', type: 'uploaded', limit: Config.PHOTOS_LIMIT }, (result) => {
                if (result.error) {
                    dispatch(G.error(result.error.message));
                } else {
                    dispatch({
                        type: 'FB_LOAD_PHOTOS_OK',
                        photos: result.data,
                    });
                }
            });

        dispatch({
            type: 'FB_LOAD_PHOTOS',
        });
    }
}

/**
 * Upload photo
 */
export function fbUploadPhoto({image, description}) {
    return (dispatch, getState) => {

        if (!getState().fb.auth.page.access_token) {
            dispatch(G.error('Page access token is not loaded'));

            return;
        }

        postImage({
            apiUrl: '/' + Config.FACEBOOK_PAGE_ID + '/photos',
            accessToken: getState().fb.auth.page.access_token,
            image,
            description,
            success: (result) => {
                dispatch({
                    type: 'FB_UPLOAD_PHOTO_OK',
                });

                dispatch({ type: 'FB_UPLOAD_HIDE' });
                dispatch(fbLoadPhotos());
            },
            error: (response) => {
                dispatch(G.error(response.message));
            }
        });

        dispatch({
            type: 'FB_UPLOAD_PHOTO',
        });
    }
}

/**
 * Show upload window
 */
export function fbUploadShow() {
    return { type: 'FB_UPLOAD_SHOW' };
}

/**
 * Hide upload window
 */
export function fbUploadHide() {
    return { type: 'FB_UPLOAD_HIDE' };
}
