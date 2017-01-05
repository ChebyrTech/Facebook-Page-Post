
export class ActionCreator {

    // Load FB SDK asynchronously
    static fbLoadSDK() {
        return { type: FB_LOAD_SDK, };
    }

    static fbInit() {
        return { type: FB_INIT, };
    }

    static fbInitOK() {
        return { type: FB_INIT_OK, };
    }

    static fbLoginStatus() {
        return { type: FB_LOGIN_STATUS, };
    }

    static fbLoginStatusOK(user) {
        return { type: FB_LOGIN_STATUS_OK, user };
    }

    static fbLogin() {
        return { type: FB_LOGIN };
    }

    static fbLoginOK(user) {
        return { type: FB_LOGIN_OK, user, };
    }

    static fbLoading() {
        return { type: LOADING };
    }

    static fbLogout() {
        return { type: FB_LOGOUT };
    }

    static fbLogoutOK() {
        return { type: FB_LOGOUT_OK };
    }

    static fbloadPage() {
        return {type: FB_LOAD_PAGE,}
    }

    static fbLoadPageOK(response) {
        return {type: FB_LOAD_PAGE_OK, page: response,};
    }

    static fbLoadPhotos() {
        return { type: FB_LOAD_PHOTOS, };
    }

    static fbLoadPhotosOK(photos) {
        return { type: FB_LOAD_PHOTOS_OK, photos, };
    }

    static fbUploadPhoto() {
        return {type: FB_UPLOAD_PHOTO, };
    }

    static fbUploadPhotoOK() {
        return { type: FB_UPLOAD_PHOTO_OK, };
    }

    /* Show upload window */
    static fbUploadShow() {
        return { type: ActionTypes.FB_UPLOAD_SHOW };
    }

    /* Hide upload window */
    static fbUploadHide() {
        return { type: ActionTypes.FB_UPLOAD_HIDE };
    }

}
