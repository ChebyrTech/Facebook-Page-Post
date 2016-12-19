import merge from 'lodash/merge';

const initialState = {
  user: null,
  page: {
    id: null,
    name: null,
    access_token: null
  },
};

export function auth(state = initialState, action) {
  switch (action.type) {

    case 'FB_LOGIN_STATUS_OK':
      return merge({}, state, initialState, {
        user: action.user,
      });

    case 'FB_LOGIN_OK':
      return merge({}, state, {
        user: action.user,
      });

    case 'FB_LOGOUT_OK':
      return merge({}, state, {
        user: null,
      });

    case 'FB_LOAD_PAGE_OK':
      return merge({}, state, {
        page: action.page,
      });

    default:
      return state;
  }
}
