
/**
 * Trigger error
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
 * Show upload window
 */
export function uploadShow() {
  return { type: 'UPLOAD_SHOW' };
}

/**
 * Hide upload window
 */
export function uploadHide() {
  return { type: 'UPLOAD_HIDE' };
}
