import $ from 'jquery';


// postImage({
//   fb: { // data to be sent to FB
//     caption: description,
//     /* place any other API params you wish to send. Ex: place / tags etc.*/
//     accessToken: FB.getAccessToken(),
//     file: {
//       name: name,
//       type: 'image/jpeg', // or png
//       dataString: image // the string containing the binary data
//     }
//   },
//   call: { // options of the $.ajax call
//     url: 'https://graph.facebook.com/me/photos', // or replace *me* with albumid
//     success: (result) => {
//       console.log(result)
//     },
//     error: (result) => {
//       console.log(result)
//     }
//   }
// });

/**
 * The "public" method to be used
 */
export function postImage(opts) {

  // create the callObject by combining the defaults with the received ones
  var callObj = $.extend({}, DEFAULT_CALL_OPTS, opts.call);

  // append the access token to the url
  callObj.url += '?access_token=' + opts.fb.accessToken;

  // set the data to be sent in the post (callObj.data = *Magic*)
  setupData(callObj, opts);

  // POST the whole thing to the defined FB url
  $.ajax(callObj);
}

/**
 * Upload image to Facebook
 */
export function uploadImage(file, description) {

}



var DEFAULT_CALL_OPTS = {
  url: 'https://graph.facebook.com/me/photos',
  type: 'POST',
  cache: false,
  success: function(response) {
    console.log(response);
  },
  error: function() {
    console.error(arguments);
  },
  // we compose the data manually, thus
  processData: false,
  /**
   *  Override the default send method to send the data in binary form
   */
  xhr: function() {
    var xhr = $.ajaxSettings.xhr();
    xhr.send = function(string) {
      var bytes = stringToBinaryArray(string);
      XMLHttpRequest.prototype.send.call(this, new Uint8Array(bytes).buffer);
    };
    return xhr;
  }
};

/**
 * It composes the multipart POST data, according to HTTP standards
 */
function composeMultipartData(fields, boundary) {
  var data = '';
  $.each(fields, function(key, value) {
    data += '--' + boundary + '\r\n';

    if (value.dataString) { // file upload
      data += 'Content-Disposition: form-data; name=\'' + key + '\'; ' +
        'filename=\'' + value.name + '\'\r\n';
      data += 'Content-Type: ' + value.type + '\r\n\r\n';
      data += value.dataString + '\r\n';
    } else {
      data += 'Content-Disposition: form-data; name=\'' + key + '\';' +
        '\r\n\r\n';
      data += value + '\r\n';
    }
  });
  data += '--' + boundary + '--';
  return data;
}

/**
 * It sets the multipart form data & contentType
 */
function setupData(callObj, opts) {
  // custom separator for the data
  var boundary = 'Awesome field separator ' + Math.random();

  // set the data
  callObj.data = composeMultipartData(opts.fb, boundary);

  // .. and content type
  callObj.contentType = 'multipart/form-data; boundary=' + boundary;
}

function stringToBinaryArray(string) {
  return Array.prototype.map.call(string, function(c) {
    return c.charCodeAt(0) & 0xff;
  });
}

function base64ToString(b64String) {
  return atob(b64String);
}
