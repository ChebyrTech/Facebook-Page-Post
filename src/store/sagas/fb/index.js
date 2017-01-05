import { takeEvery } from 'redux-saga/effects'
import * as ActionTypes from 'store/actions/types';
import initSaga from './init';

// setup multiple watchers on the same place
export default function* facebookSaga() {
    yield [
        takeEvery(ActionTypes.FB_LOAD_SDK, initSaga),
        //takeEvery("ANOTHER_ACTION", authSaga),
        //takeEvery("ANOTHER_ACTION", photosSaga),
    ];
}