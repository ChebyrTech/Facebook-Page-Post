import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { auth } from './auth';
import { general } from './general';
import { photos } from './photos';
import { GrowlerReducer } from 'flash-notification-react-redux';

export default combineReducers({
  routing,
  auth,
  general,
  photos,
  growler: GrowlerReducer,
});
