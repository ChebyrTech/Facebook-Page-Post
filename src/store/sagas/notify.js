import * as ActionTypes from 'store/actions/types';
import {takeEvery, call, put} from 'redux-saga/effects';

// setup multiple watchers on the same place
export default function* notifySaga()
{
    yield [
        takeEvery(ActionTypes.NOTIF_SEND, dismissTimeout),
    ];
}


function* dismissTimeout()
{
    if (payload.dismissAfter)
    {
        yield call(delay, payload.dismissAfter);
        yield put({ type: ActionTypes.NOTIF_DISMISS, payload: payload.id, });
    }
}