import { call, put } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga/effects'
import * as ActionTypes from 'store/actions/types';

// takeEvery allows multiple fetchData instances to be started concurrently.
// At a given moment, we can start a new uploadPhoto task while there are still one or more previous uploadPhoto tasks
// which have not yet terminated.

function* watchUploadPhoto() {
    yield takeEvery(ActionTypes.FB_UPLOAD_PHOTO, uploadPhoto)
}

export function* uploadPhoto(action) {
    try {
        const data = yield call(Api.fetchUser, action.payload.url)
        yield put({ type: "FETCH_SUCCEEDED", data })
    }
    catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}


