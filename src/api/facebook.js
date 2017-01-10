import FacebookActions from 'store/actions/facebook';

export default class Facebook {

    // You can determine whether or not the FB library has loaded by looking at window.fbAsyncInit.hasRun. 
    // If window.fbAsyncInit.hasRun is true then the library has loaded (however, this doesn't indicate whether 
    // or not the FB.init() has been called yet).

    static loadSDK() {

        window.fbAsyncInit = function () {
            console.log("FB SDK loaded");
            window.store.dispatch(FacebookActions.facebookSDKLoaded());
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return };
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        } (document, 'script', 'facebook-jssdk'));
    }

    // While you can call FB.getLoginStatus any time, to know the user's status as soon as possible after the page loads,
    // rather than calling FB.getLoginStatus explicitly, it is possible to check the user's status by setting status: true
    // when you call FB.init. To receive the response of this call, you must subscribe to the auth.statusChange event.The 
    // response object passed by this event is identical to that which would be returned by calling 
    // FB.getLoginStatus explicitly.
    static initialize() {
        if (typeof (FB) === "object") {


            FB.Event.subscribe('auth.statusChange', this.authstatusChange);

            console.log('***Initialize Facebook app');

            FB.init({
                appId: Config.FACEBOOK_APP_ID,
                cookie: true,  // enable cookies to allow the server to access
                xfbml: true,  // parse social plugins on this page
                status: true, 
                version: 'v2.8'
            });
        }
    }

    static authstatusChange(response) 
    {
        if (response.status === 'connected')
        {
            // the user is logged into Facebook and has authenticated your application
            window.store.dispatch(FacebookActions.fbUserConnected());
        }
        else if (response.status === 'not_authorized')
        {
            // the user is logged into Facebook but has not authenticated your application
            window.store.dispatch(FacebookActions.fbUserNotAuthorized());
        }
        else if (response.status === 'unknown')
        {
            // the user is either not logged into Facebook or explicitly logged out of your application so it doesn't 
            // attempt to connect to Facebook and thus, we don't know if they've authenticated your application or not
            window.store.dispatch(FacebookActions.fbUserUnknown());
        }
    }

    static login()
    {
        FB.login((response) =>
        {
            return response;
        }, { scope: 'public_profile, email, user_photos, publish_actions, manage_pages, publish_pages' });
    }

    static apiKeyValid() {
        console.log('Check for FB._apiKey:' + FB._apiKey);
        return (FB._apiKey != null);
    }

    static logout() {
        FB.logout((response) => {
            return response;
        });
    }

    // To improve the performance of your application, not every call to check the status of the user will result in 
    // request to Facebook's servers. Where possible, the response is cached. Subsequent calls to FB.getLoginStatus 
    // will return data from this cached response. To get around this, you call FB.getLoginStatus with the second 
    // parameter set to true to force a roundtrip to Facebook - effectively refreshing the cache of the response object.

    static getLoginStatus()
    {
        FB.getLoginStatus((response) => 
        {
            return response;
        }, true);
    }

    static getUserProfile() {
        FB.api('/me', { fields: 'id, name' }, (user) => 
        {
            return user;
        });
    }

    static loadPage()
    {
        FB.api('/' + Config.FACEBOOK_PAGE_ID + '/', { fields: 'name, access_token' }, (response) =>
        {
            if (response.error)
            {
                dispatch(notifSend(response.error.message));
            }
            else
            {
                dispatch(FacebookActions.fbLoadPageOK());

                if (!response.access_token)
                {
                    dispatch(notifSend('Can\'t get page access_token, please check for manage_pages and publish_pages permissions.'))
                }
            }
        });
    }

    static loadPhotos()
    {

    }
}
