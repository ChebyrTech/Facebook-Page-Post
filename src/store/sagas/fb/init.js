import Facebook from 'api/facebook';

export default function* initSaga() {
    Facebook.loadSDK();

    // Wait till Facebook SDK is Loaded
    while (!Facebook.isSDKLoaded())
        yield call(delay, 500);

    yield put(ActionCreator.fbInit());

    // Initialize Facebook app
    Facebook.initialize();

    // Wait for Facebook App initialization
    while (!Facebook.apiKeyValid())
        yield call(delay, 500);

    yield put(ActionCreator.fbLoginStatus());

    yield* fbGetLoginStatus();
}
