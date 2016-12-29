import { combineReducers } from 'redux';
import { auth } from './auth';
import { photos } from './photos';

export default combineReducers({
    auth,
    photos,
});
