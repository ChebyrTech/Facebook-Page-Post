import { createStore, applyMiddleware, compose } from 'redux';
import sagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import rootReducer from '../reducers';
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'


const finalCreateStore = compose(
    applyMiddleware(sagaMiddleware(rootSaga), routerMiddleware(hashHistory))
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
