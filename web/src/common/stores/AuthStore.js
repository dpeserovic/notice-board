import { makeObservable, action } from 'mobx';

class AuthStore {
    constructor({ baas: { auth, authStateObserver }, userStore, userService, noticeBoardService, setNoticeBoard, routerStore: { goTo } }) {
        makeObservable(this, {
            nextOrObserver: action,
        });
        this.auth = auth;
        this.authStateObserver = authStateObserver;
        this.unsubscribeAuthStateObserver = this.setAuthStateObserver();
        this.userStore = userStore;
        this.userService = userService;
        this.setNoticeBoard = setNoticeBoard;
        this.noticeBoardService = noticeBoardService;
        this.goTo = goTo;
    }

    setAuthStateObserver = () => this.authStateObserver(this.auth, this.nextOrObserver)

    nextOrObserver = async user => {
        if (user != null) {
            this.userStore.setUser(user);
            const userAdditionalInfo = (await this.userService.getById(user.uid)).data();
            this.userStore.setUserAdditionalInfo(userAdditionalInfo);
            if (this.userStore.userNoticeBoardId != null) {
                const noticeBoard = await this.noticeBoardService.getNoticeBoardById(this.userStore.userNoticeBoardId);
                this.setNoticeBoard(noticeBoard);
            }
            this.goTo('dashboard');
        } else {
            this.userStore.setUser(null);
            this.userStore.setUserAdditionalInfo(null);
            this.setNoticeBoard(null);
            this.goTo('login');
        }
    };
}

export default AuthStore;
