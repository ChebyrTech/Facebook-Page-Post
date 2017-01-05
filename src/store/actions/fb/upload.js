import * as ActionTypes from 'action_types';

/**
 * Post image to facebook
 */
export function postImage({apiUrl, accessToken, image, description, success, error}) {
    const data = new FormData();
    data.append('access_token', accessToken);
    data.append('source', image);
    data.append('message', description);

    FB.api(
        apiUrl,
        'POST',
        data,
        (response) => {
            if (!response || response.error) {
                error(response);
            }
            else {
                success(response);
            }
        }
    );
}
