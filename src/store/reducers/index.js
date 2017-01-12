import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import facebook from './facebook';
import notify from './notify';

export default combineReducers({
    routing,
    facebook,
    notify,
});
