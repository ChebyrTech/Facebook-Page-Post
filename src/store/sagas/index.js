import {fork} from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import facebookSaga from './fb';
import notifySaga from './notify';


// the middleware support for passing multiple sagas is a just a convenience. 
// If you need to control top Sagas (like cancelling them) you should use a single root Saga.
// You can't do this with the createSagaMiddleware(..topSagas) because you can't get a reference to the forked tasks.
export default function* rootSaga() {
    yield [
        fork(facebookSaga),
        fork(notifySaga),
        //fork(thirdSaga),
    ];
}

// path = '/chat'
function* navigateTo(path) {
    yield apply(browserHistory, browserHistory.push, [path]);
}