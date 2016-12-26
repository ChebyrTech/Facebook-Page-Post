import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'


const finalCreateStore = compose(
    applyMiddleware(thunk, routerMiddleware(hashHistory))
)(createStore);

export default function configureStore(initialState) {
    return finalCreateStore(rootReducer, initialState);
}
