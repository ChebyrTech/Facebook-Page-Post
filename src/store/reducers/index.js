import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import fb from './fb/index';
import { general } from './general';
import notify from './notify';

export default combineReducers({
    routing,
    general,
    fb,
    notify,
});
