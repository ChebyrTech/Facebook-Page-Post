import * as G from '../general';
import ActionCreator from 'store/actions/creator';
import { push } from 'react-router-redux';

/**
 * Login status
 */
export function fbLoginStatus() {
    return dispatch => {

        FB.getLoginStatus((response) => {


        });

        dispatch(ActionCreator.fbLoginStatus());
    };
}

/**
 * Login
 */
export function fbLogin() {
    return dispatch => {

        FB.login((response) => {

            if (response.authResponse) {
                // If logged in successfully, get user data
                FB.api('/me', { fields: 'id, name' }, (user) => {
                    user.accessToken = response.authResponse.accessToken;
                    dispatch(dispatch(ActionCreator.fbLoginOK(user)));

                    dispatch(fbLoadPage());
                    dispatch(push('/fb/photos'));
                });
            } else {
                // Failed to login
                dispatch(G.error('Failed to login.'));
            }

        }, { scope: 'public_profile, email, user_photos, publish_actions, manage_pages, publish_pages' });

        dispatch(ActionCreator.fbLogin());
    };
}


/**
 * Load page data
 */
export function fbLoadPage() {
    return dispatch => {

        FB.api('/' + Config.FACEBOOK_PAGE_ID + '/', { fields: 'name, access_token' }, (response) => {
            if (response.error) {
                dispatch(G.error(response.error.message));
            } else {
                dispatch(dispatch(ActionCreator.fbLoadPageOK()));

                if (!response.access_token) {
                    dispatch(G.error('Can\'t get page access_token, please check for manage_pages and publish_pages permissions.'))
                }
            }
        });

        dispatch(ActionCreator.fbLoadPage());
    };
}
