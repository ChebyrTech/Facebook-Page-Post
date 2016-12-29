import * as G from './general';
import { push } from 'react-router-redux';

/**
 * Login status
 */
export function fbInit() {
    return dispatch => {

        FB.getLoginStatus((response) => {

            if (response.status === 'connected') {
                dispatch({ type: 'LOADING' });
                // Logged into your app and Facebook.
                FB.api('/me', { fields: 'id, name' }, (user) => {
                    dispatch({
                        type: 'FB_INIT_OK',
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
            type: 'FB_INIT',
        });
    };
}
