import {call, put, take} from 'redux-saga/effects';
//import {delay} from 'redux-saga'
import Facebook from 'api/facebook';
import * as ActionTypes from 'store/actions/types';
import FacebookActions from 'store/actions/facebook';

export default function* initSaga()
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
    //while (!Facebook.apiKeyValid())
    //    yield call(delay, 1000);

    //console.log('***Call get Login staut');
    //yield put(FacebookActions.fbLoginStatus());
    //yield* fbGetLoginStatus();
}


