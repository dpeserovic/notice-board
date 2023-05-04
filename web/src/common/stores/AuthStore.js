import { makeObservable, observable, computed, action, runInAction } from 'mobx';

class AuthStore {
    user = null;

    get isLoggedIn() {
        return this.user != null;
    }

    get displayName() {
        return this.isLoggedIn && this.user.email.split('@')[0];
    }

    constructor({ baas: { auth, membershipService, authStateObserver }, routerStore: { goTo }, globalLoaderStore, notificationStore }) {
        makeObservable(this, {
            nextOrObserver: action,
            logout: action,
            user: observable,
            isLoggedIn: computed,
        });
        this.auth = auth;
        this.membershipService = membershipService;
        this.authStateObserver = authStateObserver;
        this.unsubscribeAuthStateObserver = this.setAuthStateObserver();
        this.goTo = goTo;
        this.globalLoaderStore = globalLoaderStore;
        this.notificationStore = notificationStore;
    }

    setAuthStateObserver = () => this.authStateObserver(this.auth, this.nextOrObserver)

    nextOrObserver = user => {
        if (user != null) {
            this.user = user;
            this.goTo('dashboard');
        } else {
            this.user = null;
            this.goTo('login');
        }
    };

    logout = async () => {
        if (this.user == null) return;
        try {
            this.globalLoaderStore.suspend();
            await this.membershipService.signOut(this.auth);
        } catch (e) {
            this.notificationStore.showErrorToast('Error signing out');
        } finally {
            this.globalLoaderStore.resume();
        }
    }
}

export default AuthStore;
