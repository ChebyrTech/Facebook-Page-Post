import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import fb from './fb/index';
import { general } from './general';
import { GrowlerReducer } from 'flash-notification-react-redux';

export default combineReducers({
  routing,
  general,
  fb,
  growler: GrowlerReducer,
});
