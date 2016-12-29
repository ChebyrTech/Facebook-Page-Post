import { combineSagas } from 'redux-saga';
import { init } from './init';
import { auth } from './auth';
import { photos } from './photos';

export default combineSagas({
    init,
    auth,
    photos,
});
