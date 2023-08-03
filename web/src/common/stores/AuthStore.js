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
            this.userStore.setUserAdditionalInfo((await this.userService.getById(user.uid)).data());
            if (this.userStore.userNoticeBoardId != null) this.setNoticeBoard((await this.noticeBoardService.getById(this.userStore.userNoticeBoardId)));
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
