import {call, put, delay} from 'redux-saga/effects';
import Facebook from 'api/facebook';

export default function* initSaga() {
    // Load Facebook SDK asynchronously
    Facebook.loadSDK();

    // Wait till Facebook SDK is Loaded
    while (!Facebook.isSDKLoaded())
        yield call(delay, 500);

    yield put(FacebookActions.fbInit());

    // Initialize Facebook app
    Facebook.initialize();

    // Wait for Facebook App initialization
    while (!Facebook.apiKeyValid())
        yield call(delay, 500);

    yield put(FacebookActions.fbLoginStatus());

    yield* fbGetLoginStatus();
}
