import { createStore, applyMiddleware, compose } from 'redux';
import sagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const finalCreateStore = composeEnhancers(
    applyMiddleware(sagaMiddleware(rootSaga), logger(), routerMiddleware(hashHistory))
    //DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState)

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
