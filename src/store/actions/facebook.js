import * as ActionTypes from 'store/actions';

export default class FacebookActions
{
    // Load FB SDK asynchronously
    static loadFacebookSDK() {
        return { type: ActionTypes.FB_LOAD_SDK };
    }

    // Load FB SDK asynchronously
    static facebookSDKLoaded()
    {
        return { type: ActionTypes.FB_LOAD_SDK_OK };
    }

    static fbInit() {
        return { type: ActionTypes.FB_INIT };
    }

    static fbInitOK() {
        return { type: ActionTypes.FB_INIT_OK };
    }

    static fbUserConnected(authResponse)
    {
        return { type: ActionTypes.FB_USER_CONNECTED, authResponse };
    }

    static fbUserNotAuthorized()
    {
        return { type: ActionTypes.FB_USER_NOT_AUTHORIZED };
    }

    static fbUserUnknown()
    {
        return { type: ActionTypes.FB_USER_UNKNOWN };
    }

    static getUserProfile()
    {
        return { type: ActionTypes.FB_GET_USER_PROFILE };
    }

    static userProfileReceived(user)
    {
        return { type: ActionTypes.FB_USER_PROFILE_OK, user };
    }

    static userProfileError(errorMessage)
    {
        return { type: ActionTypes.FB_USER_PROFILE_ERR, errorMessage };
    }

    static fbLogin() {
        return { type: ActionTypes.FB_USER_LOGIN };
    }

    static fbLogout() {
        return { type: ActionTypes.FB_USER_LOGOUT };
    }

    static fbloadPage() {
        return { type: ActionTypes.FB_LOAD_PAGE };
    }

    static fbLoadPageOK(response) {
        return { type: ActionTypes.FB_LOAD_PAGE_OK, page: response };
    }

    static fbLoadPageErr(errorMessage)
    {
        return { type: ActionTypes.FB_LOAD_PAGE_ERR, errorMessage };
    }

    static fbLoadPhotos() {
        return { type: ActionTypes.FB_LOAD_PHOTOS };
    }

    static fbLoadPhotosOK(photos) {
        return { type: ActionTypes.FB_LOAD_PHOTOS_OK, photos };
    }

    static fbLoadPhotosErr(errorMessage)
    {
        return { type: ActionTypes.FB_LOAD_PHOTOS_ERR, errorMessage };
    }

    static fbUploadPhoto() {
        return { type: ActionTypes.FB_UPLOAD_PHOTO };
    }

    static fbUploadPhotoOK() {
        return { type: ActionTypes.FB_UPLOAD_PHOTO_OK };
    }

    static fbUploadPhotoErr(errorMessage)
    {
        return { type: ActionTypes.FB_UPLOAD_PHOTO_ERR, errorMessage };
    }

    /* Show upload window */
    static fbUploadShow() {
        return { type: ActionTypes.ActionTypes.FB_UPLOAD_SHOW };
    }

    /* Hide upload window */
    static fbUploadHide() {
        return { type: ActionTypes.ActionTypes.FB_UPLOAD_HIDE };
    }

}
