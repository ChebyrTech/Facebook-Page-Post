
/**
 * Show error
 */
export function error(message) {
  return dispatch => {
    if (message) {
      dispatch({
        type: 'GROWLER__SHOW',
        growler: {
          text: message,
          type: 'growler--error',
        }
      });
    }

    dispatch({
      type: 'ERROR',
    });
  }
}

/**
 * Show notification
 */
export function notify(message) {
  return dispatch => {
    if (message) {
      dispatch({
        type: 'GROWLER__SHOW',
        growler: {
          text: message,
          type: 'growler--success',
        }
      });
    }
  }
}
