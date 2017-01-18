import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';
import * as ActionTypes from 'store/actions';
import Facebook from 'api/facebook';
import FacebookActions from 'store/actions/facebook';
import NotifyActions from 'store/actions/facebook';

function* loadFacebookSDK()
{
    // console.log('***Load Facebook SDK asynchronously');
    // Load Facebook SDK asynchronously
    Facebook.loadSDK();

    // yield call(delay, action.payload.dismissAfter);


    // console.log('***Wait till Facebook SDK is Loaded');
    // Wait till Facebook SDK is Loaded
    yield take(ActionTypes.FB_LOAD_SDK_OK);

    // Initialize Facebook app

    yield put(FacebookActions.fbInit());
    Facebook.initialize();

    // console.log('***Wait for Facebook App initialization');
    // Wait for Facebook App initialization
}

function* facebookLogin()
{
    // console.log('***Login to Facebook');
    Facebook.login();
}

function* facebookLogout()
{
    // console.log('***Logout from Facebook');
    Facebook.logout();
}

function* facebookUserConnected()
{
    yield put(FacebookActions.getUserProfile());
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

function* loadPageOK()
{
    yield put(push('/fb/photos'));
    // yield put(push('/about-us'));
    yield put(FacebookActions.fbLoadPhotos());
}

function* loadPhotos()
{
    Facebook.loadPhotos();
}

function* uploadPhoto(action)
{
    const getPageAccessToken = (state) => { return state.facebook.page.access_token; };
    const pageAccessToken = yield select(getPageAccessToken);
    if (pageAccessToken)
    {
        Facebook.uploadPhoto(pageAccessToken, action.fileObj);
    }
    else
    {
        yield put(NotifyActions.warning('Page access token is not loaded'));
    }
}

// setup multiple watchers on the same place
export default function* facebookSaga()
{
    yield [
        takeEvery(ActionTypes.FB_LOAD_SDK, loadFacebookSDK),
        takeEvery(ActionTypes.FB_USER_LOGIN, facebookLogin),
        takeEvery(ActionTypes.FB_USER_LOGOUT, facebookLogout),
        takeEvery(ActionTypes.FB_USER_CONNECTED, facebookUserConnected),
        takeEvery(ActionTypes.FB_USER_NOT_AUTHORIZED, facebookUserNotAuthorized),
        takeEvery(ActionTypes.FB_USER_UNKNOWN, facebookUserUnknown),
        takeEvery(ActionTypes.FB_USER_PROFILE_OK, facebookUserProfileReceived),
        takeEvery(ActionTypes.FB_LOAD_PAGE_OK, loadPageOK),
        takeEvery(ActionTypes.FB_LOAD_PHOTOS, loadPhotos),
        takeEvery(ActionTypes.FB_UPLOAD_PHOTO, uploadPhoto),
    ];
}
