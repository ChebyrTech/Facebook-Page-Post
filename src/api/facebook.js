
export class Facebook {

    static loadSDK() {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }

    // You can determine whether or not the FB library has loaded by looking at window.fbAsyncInit.hasRun. 
    // If window.fbAsyncInit.hasRun is true then the library has loaded (however, this doesn't indicate whether 
    // or not the FB.init() has been called yet).

    static isSDKLoaded() {
        return (window.fbAsyncInit != null);
    }

    static initialize() {
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
    }

    static apiKeyValid() {
        return (FB._apiKey != null);
    }

    static logout() {
        FB.logout((response) => {
            return response;
        });
    }

    static getLoginStatus() {
        FB.getLoginStatus((response) => {
            return response;
        });
    }

    static getUserProfile() {
        FB.api('/me', { fields: 'id, name' }, (user) => {
            return user;
        });
    }

}
