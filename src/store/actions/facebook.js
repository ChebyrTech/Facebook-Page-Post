import * as ActionTypes from 'store/actions/types';

export default class FacebookActions {
    
    // Load FB SDK asynchronously
    static loadFacebookSDK() {
        return { type: ActionTypes.FB_LOAD_SDK, };
    }

    static fbInit() {
        return { type: ActionTypes.FB_INIT, };
    }

    static fbInitOK() {
        return { type: ActionTypes.FB_INIT_OK, };
    }

    static fbLoginStatus() {
        return { type: ActionTypes.FB_LOGIN_STATUS, };
    }

    static fbLoginStatusOK(user) {
        return { type: ActionTypes.FB_LOGIN_STATUS_OK, user };
    }

    static fbLogin() {
        return { type: ActionTypes.FB_LOGIN };
    }

    static fbLoginOK(user) {
        return { type: ActionTypes.FB_LOGIN_OK, user, };
    }

    static fbLoading() {
        return { type: LOADING };
    }

    static fbLogout() {
        return { type: ActionTypes.FB_LOGOUT };
    }

    static fbLogoutOK() {
        return { type: ActionTypes.FB_LOGOUT_OK };
    }

    static fbloadPage() {
        return {type: ActionTypes.FB_LOAD_PAGE,}
    }

    static fbLoadPageOK(response) {
        return {type: ActionTypes.FB_LOAD_PAGE_OK, page: response,};
    }

    static fbLoadPhotos() {
        return { type: ActionTypes.FB_LOAD_PHOTOS, };
    }

    static fbLoadPhotosOK(photos) {
        return { type: ActionTypes.FB_LOAD_PHOTOS_OK, photos, };
    }

    static fbUploadPhoto() {
        return {type: ActionTypes.FB_UPLOAD_PHOTO, };
    }

    static fbUploadPhotoOK() {
        return { type: ActionTypes.FB_UPLOAD_PHOTO_OK, };
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
