import { combineSagas } from 'redux-saga';
import fb from './fb/index';

export default combineSagas({
    fb,
});
