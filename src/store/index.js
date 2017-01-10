import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootSaga from './sagas';
import rootReducer from './reducers';
import Routes from '../components/routes';

export default class Store {
    constructor() {
        this.sagaMiddleware = createSagaMiddleware();
        if (process.env.NODE_ENV === 'production') {
            this.configureProd();
        }
        else {
            this.configureDev();
        }
        this.sagaMiddleware.run(rootSaga);

        this.history = syncHistoryWithStore(hashHistory, this.store);

        this.provider = (
            <Provider store={this.store}>
            <Routes history={this.history} />
            </Provider>);

        window.store = this.store;
    }

    configureDev() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

        this.store = createStore(rootReducer, applyMiddleware(this.sagaMiddleware, logger(), routerMiddleware(hashHistory)));

        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('./reducers', () => {
                const nextRootReducer = require('./reducers');
                this.store.replaceReducer(nextRootReducer);
            });
        }
    }

    configureProd() {
        this.store = createStore(rootReducer, applyMiddleware(this.sagaMiddleware, routerMiddleware(hashHistory)));
    }

    getProvider() {
        return this.provider;
    }
}
