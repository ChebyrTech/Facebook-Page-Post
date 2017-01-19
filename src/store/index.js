import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import React from 'react';

import rootSaga from './sagas';
import rootReducer from './reducers';
import Routes from 'components/routes';

export default class StoreProvider
{
    constructor()
    {
        const componentRouter = routerMiddleware(hashHistory);
        const sagaMiddleware = createSagaMiddleware();

        if (process.env.NODE_ENV === 'production')
        {
            this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware, componentRouter));
        }
        else
        {
            const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

            this.store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger(), componentRouter));

            if (module.hot)
            {
                // Enable Webpack hot module replacement for reducers
                module.hot.accept('./reducers', () =>
                {
                    const nextRootReducer = require('./reducers');
                    this.store.replaceReducer(nextRootReducer);
                });
            }
        }
        sagaMiddleware.run(rootSaga);

        const history = syncHistoryWithStore(hashHistory, this.store);

        this.provider = (
            <Provider store={this.store}>
                <Routes history={history} />
            </Provider>);
    }

    getStore()
    {
        return this.store;
    }

    getProvider()
    {
        return this.provider;
    }
}
