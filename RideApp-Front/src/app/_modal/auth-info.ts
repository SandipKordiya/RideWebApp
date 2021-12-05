export class AuthInfo {
    constructor(
        public $uid: string
    ) {

    }
    isLoggedIn() {
        if (localStorage.getItem('uid')) {
            this.$uid = localStorage.getItem('uid');
            return !!this.$uid;
        }
        return !!this.$uid;
    }
}
