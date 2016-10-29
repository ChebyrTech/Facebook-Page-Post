import $ from 'jquery';

/**
 * Post image to facebook
 */
export function postImage({apiUrl, accessToken, image, description, success, error}) {
  const data = new FormData();
  data.append('access_token', accessToken);
  data.append('source', image);
  data.append('message', description);

  $.ajax({
    url: 'https://graph.facebook.com' + apiUrl + '?access_token=' + accessToken,
    type: 'POST',
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    success:function (data) {
      success(data);
    },
    error:function (data) {
      error(data);
    }
  });
}
