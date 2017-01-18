import FileOperations from './file-operations';
import FacebookActions from 'store/actions/facebook';
import notifSend from 'store/actions/notify';

export default class Facebook
{
    // You can determine whether or not the FB library has loaded by looking at window.fbAsyncInit.hasRun.
    // If window.fbAsyncInit.hasRun is true then the library has loaded (however, this doesn't indicate whether
    // or not the FB.init() has been called yet).

    static loadSDK()
    {
        window.fbAsyncInit = () =>
        {
            // console.log('FB SDK loaded');
            window.store.dispatch(FacebookActions.facebookSDKLoaded());
        };

        (function (d, s, id)
        {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            const js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            // js.src = '//connect.facebook.net/en_US/sdk/debug.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    // While you can call FB.getLoginStatus any time, to know the user's status as soon as possible after the page loads,
    // rather than calling FB.getLoginStatus explicitly, it is possible to check the user's status by setting status: true
    // when you call FB.init. To receive the response of this call, you must subscribe to the auth.statusChange event.The
    // response object passed by this event is identical to that which would be returned by calling
    // FB.getLoginStatus explicitly.
    static initialize()
    {
        if (typeof (FB) === 'object')
        {
            // FB.Event.subscribe('auth.statusChange', this.authstatusChange);
            //
            // console.log('***Initialize Facebook app');
            //
            FB.init({
                appId: Config.FACEBOOK_APP_ID,
                cookie: true,  // enable cookies to allow the server to access
                xfbml: false,  // parse social plugins on this page
                // status: true,
                version: 'v2.8',
            });
        }
    }

    static authstatusChange(response)
    {
        if (response.status === 'connected')
        {
            if (response.authResponse)
            {
                // the user is logged into Facebook and has authenticated your application
                window.store.dispatch(FacebookActions.fbUserConnected(response.authResponse));
            }
            else
            {
                // If the authResponse object is not present, the user is either not logged into Facebook,
                // or has not authorized your app.
                window.store.dispatch(FacebookActions.fbUserUnknown());
            }
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

    static apiKeyValid()
    {
        // console.log('Check for FB._apiKey:' + FB._apiKey);
        return (FB._apiKey !== null);
    }

    // To improve the performance of your application, not every call to check the status of the user will result in
    // request to Facebook's servers. Where possible, the response is cached. Subsequent calls to FB.getLoginStatus
    // will return data from this cached response. To get around this, you call FB.getLoginStatus with the second
    // parameter set to true to force a roundtrip to Facebook - effectively refreshing the cache of the response object.

    static getLoginStatus()
    {
        FB.getLoginStatus(this.authstatusChange, true);
    }

    static login()
    {
        FB.login(this.authstatusChange, { scope: 'public_profile, email, user_photos, publish_actions, manage_pages, publish_pages' });
    }

    static logout()
    {
        FB.logout(this.authstatusChange);
    }

    static getUserProfile()
    {
        FB.api('/me', { fields: 'id, name' }, (response) =>
        {
            if (!response)
            {
                window.store.dispatch(FacebookActions.userProfileError('No response'));
            }
            else if (response.error)
            {
                window.store.dispatch(FacebookActions.userProfileError(response.error.message));
            }
            else
            {
                // success: 'response' is user profile
                window.store.dispatch(FacebookActions.userProfileReceived(response));
            }
        });
    }

    static loadPage()
    {
        FB.api('/' + Config.FACEBOOK_PAGE_ID + '/', { fields: 'name, access_token' }, (response) =>
        {
            if (!response)
            {
                window.store.dispatch(FacebookActions.fbLoadPageErr('No response'));
            }
            else if (response.error)
            {
                window.store.dispatch(FacebookActions.fbLoadPageErr(response.error.message));
            }
            else if (!response.access_token)
            {
                window.store.dispatch(FacebookActions.fbLoadPageErr('Can\'t get page access_token, please check for manage_pages and publish_pages permissions.'));
            }
            else
            {
                // success: 'response' is page
                window.store.dispatch(FacebookActions.fbLoadPageOK(response));
            }
        });
    }

    static loadPhotos()
    {
        const path = '/' + Config.FACEBOOK_PAGE_ID + '/photos';
        const params = { fields: 'images, name, permalink_url', type: 'uploaded', limit: Config.PHOTOS_LIMIT };
        FB.api(path, params, (response) =>
        {
            if (!response)
            {
                window.store.dispatch(FacebookActions.fbLoadPhotosErr('No response'));
            }
            else if (response.error)
            {
                window.store.dispatch(FacebookActions.fbLoadPhotosErr(response.error.message));
            }
            else
            {
                window.store.dispatch(FacebookActions.fbLoadPhotosOK(response.data));
            }
        });
    }

    // Upload photo
    static uploadPhoto(pageAccessToken, fileObj)
    {
        FileOperations.readImageFile(fileObj.file, (image) =>
        {
            const facebookGraph = 'https://graph.facebook.com';
            const path = '/' + Config.FACEBOOK_PAGE_ID + '/photos';

            const formData = new FormData();
            formData.append('access_token', pageAccessToken);
            formData.append('source', image);
            formData.append('message', fileObj.description);

            const endpoint = facebookGraph + path;

            const xhr = new XMLHttpRequest();
            xhr.open('POST', endpoint, true);
            xhr.onload = () =>
            {
                const response = xhr.response;
                window.store.dispatch(FacebookActions.fbUploadPhotoOK());
            };
            xhr.ontimeout = () =>
            {
                window.store.dispatch(FacebookActions.fbUploadPhotoErr('Could not connect with Facebook'));
            };
            xhr.onerror = () =>
            {
                window.store.dispatch(FacebookActions.fbUploadPhotoErr(xhr.response.error.message));
            };

            xhr.send(formData);


            /* FB.api(path, 'POST', formData, (response) =>
            {
                if (!response || response.error)
                {
                    window.store.dispatch(FacebookActions.fbUploadPhotoErr(response.error.message));
                }
                else
                {
                    window.store.dispatch(FacebookActions.fbUploadPhotoOK());
                }
            }); */
        });
    }
}
