import {put, take} from 'redux-saga/effects';
import * as ActionTypes from 'store/actions/types';
import FacebookActions from 'store/actions/facebook';
import Facebook from 'api/facebook';

export function* fbGetLoginStatus() {
    response = yield call(Facebook, Facebook.getLoginStatus());

    if (response.status === 'connected') {
        yield put(FacebookActions.fbLoading());

        // Logged into your app and Facebook.

        user = yield call(Facebook, Facebook.getUserProfile());

        if (user) {
            yield put(FacebookActions.fbLoginStatusOK(user));

            yield put(fbLoadPage());
            yield put(push('/fb/photos'));
        }
        else {
        }
    }
    else {
        // Failed to login
        yield (G.notify('Please login'));
    }
}

export function* watchForLoginStatus() {
    while (true) {
        yield take(ActionTypes.FB_LOGIN_STATUS);

        var response = Facebook.logout();
        if (response) {
            yield put(FacebookActions.fbLogoutOK(response));
            yield put(push('/'));
        }
    }
}

export function* watchForLogin() {
    while (true) {
        yield take(ActionTypes.FB_LOGIN);

        var response = Facebook.logout();
        if (response) {
            yield put(FacebookActions.fbLogoutOK(response));
            yield put(push('/'));
        }
    }
}

export function* watchForLogout() {
    while(true) {
        yield take(ActionTypes.FB_LOGOUT);

        var response = Facebook.logout();
        if(response)
        {
            yield put(FacebookActions.fbLogoutOK(response));
            yield put(push('/'));
        }
    }
}