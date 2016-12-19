import * as G from './general';
import { push } from 'react-router-redux';

/**
 * Login status
 */
export function fbLoginStatus() {
  return dispatch => {

    FB.getLoginStatus((response) => {

      if (response.status === 'connected') {
        dispatch({type: 'LOADING'});
        // Logged into your app and Facebook.
        FB.api('/me', { fields: 'id, name' }, (user) => {
          dispatch({
            type: 'FB_LOGIN_STATUS_OK',
            user
          });

          dispatch(fbLoadPage());
          dispatch(push('/fb/photos'));
        });
      } else {
        // Failed to login
        dispatch(G.notify('Please login'));
      }

    });

    dispatch({
      type: 'FB_LOGIN_STATUS',
    });
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
          dispatch(dispatch({
            type: 'FB_LOGIN_OK',
            user,
          }));

          dispatch(fbLoadPage());
          dispatch(push('/fb/photos'));
        });
      } else {
        // Failed to login
        dispatch(G.error('Failed to login.'));
      }

    }, { scope: 'public_profile, email, user_photos, publish_actions, manage_pages, publish_pages' });

    dispatch({
      type: 'FB_LOGIN'
    });
  };
}

/**
 * Logout
 */
export function fbLogout() {
  return dispatch => {

    FB.logout(function(response) {
      dispatch({
        type: 'FB_LOGOUT_OK'
      });
    });

    dispatch({
      type: 'FB_LOGOUT'
    });

    dispatch(push('/'));
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
        dispatch(dispatch({
          type: 'FB_LOAD_PAGE_OK',
          page: response,
        }));

        if ( ! response.access_token) {
          dispatch(G.error('Can\'t get page access_token, please check for manage_pages and publish_pages permissions.'))
        }
      }
    });

    dispatch({
      type: 'FB_LOAD_PAGE',
    });
  };
}
