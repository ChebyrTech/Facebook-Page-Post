import * as ActionTypes from 'store/actions';
import { takeEvery, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

function* dismissTimeout(action)
{
    if (action.payload.dismissAfter)
    {
        yield call(delay, action.payload.dismissAfter);
        yield put({ type: ActionTypes.NOTIF_DISMISS, payload: action.payload.id });
    }
}

// setup multiple watchers on the same place
export default function* notifySaga()
{
    yield [
        takeEvery(ActionTypes.NOTIF_SEND, dismissTimeout),
    ];
}
