import { error } from './general';

/**
 * Login status
 */
export function loginStatus() {
  return dispatch => {

    window.fbAsyncInit = function() {

      FB.init({
        appId: Config.FACEBOOK_APP_ID,
        cookie: true,  // enable cookies to allow the server to access
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8'
      });

      FB.getLoginStatus((response) => {

        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          FB.api('/me', { fields: 'id, name' }, (user) => {
            dispatch({
              type: 'LOGIN_STATUS_OK',
              user
            });

            dispatch(loadPage());
          });
        } else {
          // Failed to login
          dispatch(error('Failed to login'));
        }

      });

    }.bind(this);

    dispatch({
      type: 'LOGIN_STATUS',
    });
  };
}

/**
 * Login
 */
export function login() {
  return dispatch => {
    FB.login((response) => {

      if (response.authResponse) {
        // If logged in successfully, get user data
        FB.api('/me', { fields: 'id, name' }, (user) => {
          user.accessToken = response.authResponse.accessToken;
          dispatch(dispatch({
            type: 'LOGIN_OK',
            user,
          }));

          dispatch(loadPage());
        });
      } else {
        // Failed to login
        dispatch(error('Failed to login.'));
      }

    }, { scope: 'public_profile, email, user_photos, publish_actions, manage_pages, publish_pages' });

    dispatch({
      type: 'LOGIN'
    });
  };
}

/**
 * Logout
 */
export function logout() {
  return dispatch => {
    FB.logout(function(response) {
      dispatch({
        type: 'LOGOUT_OK'
      });
    });

    dispatch({
      type: 'LOGOUT'
    });
  };
}

/**
 * Load page data
 */
export function loadPage() {
  return dispatch => {
    FB.api('/' + Config.FACEBOOK_PAGE_ID + '/', { fields: 'name, access_token' }, (response) => {
      if (response.error) {
        dispatch(error(response.error.message));
      } else {
        dispatch(dispatch({
          type: 'LOAD_PAGE_OK',
          page: response,
        }));

        if ( ! response.access_token) {
          dispatch(error('Can\'t get page access_token, please check for manage_pages and publish_pages permissions.'))
        }
      }
    });

    dispatch({
      type: 'LOAD_PAGE',
    });
  };
}
