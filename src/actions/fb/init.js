
export function loadSDK() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
}

export function init() {
    // If FB.init has not been called yet than FB._apiKey is null.
    // Following code block checks _apiKey and initializes FB.

    if (typeof (FB) === "object" && FB._apiKey === null) {
        FB.init({
            appId: Config.FACEBOOK_APP_ID,
            cookie: true,  // enable cookies to allow the server to access
            xfbml: true,  // parse social plugins on this page
            version: 'v2.8'
        });
    }

    ensureInit();
}

function ensureInit() {
    if (!FB._apiKey) {
        setTimeout(function () {
            ensureInit();
        }, 50);
    }
    else {
        dispatch(A.fbLoginStatus());
    }
}
