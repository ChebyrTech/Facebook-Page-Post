import * as G from '../general';
import FacebookActions from 'store/actions/facebook';
//import { postImage } from 'fb-upload';

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
                    dispatch(FacebookActions.fbLoadPhotosOK(result.data));
                }
            });

        dispatch(FacebookActions.fbLoadPhotos());
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
                dispatch(FacebookActions.fbUploadPhotoOK());

                dispatch(FacebookActions.fbUploadHide());
                dispatch(fbLoadPhotos());
            },
            error: (response) => {
                dispatch(G.error(response.message));
            }
        });

        dispatch(FacebookActions.fbUploadPhoto());
    }
}

