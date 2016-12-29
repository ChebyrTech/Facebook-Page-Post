import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux'
import sagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootSaga from './sagas';
import rootReducer from './reducers';
import Routes from '../components/routes';

class Store {
    constructor() {
        this.store = configureStore();
        this.history = syncHistoryWithStore(hashHistory, store);

        this.provider = (
            <Provider store={store}>
            <Routes history={history} />
            </Provider>)
            ;
    }

    configureStore(initialState) {
        if (process.env.NODE_ENV === 'production') {
            return configureProd(initialState);
        } else {
            return configureDev(initialState);
        }
    }

    configureDev(initialState) {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        store = createStore(rootReducer, applyMiddleware(sagaMiddleware(rootSaga), logger(), routerMiddleware(hashHistory)));

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => {
                const nextRootReducer = require('./reducers');
                store.replaceReducer(nextRootReducer);
            });
        }

    }

    configureProd(initialState) {
        store = createStore(rootReducer, applyMiddleware(sagaMiddleware(rootSaga), routerMiddleware(hashHistory)));
        return store;
    }

    getProvider() {
        return provider;
    }
}