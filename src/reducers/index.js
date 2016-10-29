import { combineReducers } from 'redux';
import { auth } from './auth';
import { general } from './general';
import { photos } from './photos';
import { GrowlerReducer } from 'flash-notification-react-redux';

export default combineReducers({
  auth,
  general,
  photos,
  growler: GrowlerReducer,
});
