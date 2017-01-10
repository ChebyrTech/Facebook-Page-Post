import { call, put, take, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as ActionTypes from 'store/actions/types';
import Facebook from 'api/facebook';
import FacebookActions from 'store/actions/facebook';

function* loadFacebookSDK()
{
    console.log('***Load Facebook SDK asynchronously');
    // Load Facebook SDK asynchronously
    Facebook.loadSDK();

    console.log('***Wait till Facebook SDK is Loaded');
    // Wait till Facebook SDK is Loaded
    yield take(ActionTypes.FB_LOAD_SDK_OK);

    // Initialize Facebook app

    yield put(FacebookActions.fbInit());
    Facebook.initialize();

    console.log('***Wait for Facebook App initialization');
    // Wait for Facebook App initialization
}

function* facebookLogin()
{
    console.log('***Login to Facebook');
    Facebook.login();
}

function* facebookLogout()
{
    console.log('***Logout from Facebook');
    Facebook.logout();
}

function* facebookUserConnected()
{
    yield put(FacebookActions.userProfileRequest());
    Facebook.getUserProfile();
}

function* facebookUserNotAuthorized()
{
    yield put(push('/fb/login'));
}

function* facebookUserUnknown()
{
    yield put(push('/fb/login'));
}

function* facebookUserProfileReceived()
{
    yield put(FacebookActions.fbLoadPage());
    Facebook.loadPage();
}

function* loadPhotos()
{
    yield put(push('/fb/photos'));
    yield put(FacebookActions.fbLoadPhotos());
}

function* uploadPhoto()
{
}

// setup multiple watchers on the same place
export default function* facebookSaga()
{
    yield [
        takeEvery(ActionTypes.FB_LOAD_SDK, loadFacebookSDK),
        takeEvery(ActionTypes.FB_LOGIN, facebookLogin),
        takeEvery(ActionTypes.FB_LOGOUT, facebookLogout),
        takeEvery(ActionTypes.FB_USER_CONNECTED, facebookUserConnected),
        takeEvery(ActionTypes.FB_USER_NOT_AUTHORIZED, facebookUserNotAuthorized),
        takeEvery(ActionTypes.FB_USER_UNKNOWN, facebookUserUnknown),
        takeEvery(ActionTypes.FB_USER_PROFILE_OK, facebookUserProfileReceived),
        takeEvery(ActionTypes.FB_LOAD_PAGE_OK, loadPhotos),
        takeEvery(ActionTypes.FB_UPLOAD_PHOTO, loadPhotos),
    ];
}
