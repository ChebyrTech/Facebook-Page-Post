import * as G from './general';
import { push } from 'react-router-redux';
import * as ActionTypes from 'store/actions/types';

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
                        type: ActionTypes.FB_INIT_OK,
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
            type: ActionTypes.FB_INIT,
        });
    };
}
