import { makeObservable, observable, computed, action } from 'mobx';

class UserStore {
    user = null;

    get isLoggedIn() {
        return this.user != null;
    }

    get displayName() {
        return this.isLoggedIn && this.user.email.split('@')[0];
    }

    constructor({ baas: { auth, membershipService }, globalLoaderStore, notificationStore }) {
        makeObservable(this, {
            user: observable,
            setUser: action,
            isLoggedIn: computed,
        });
        this.auth = auth;
        this.membershipService = membershipService;
        this.globalLoaderStore = globalLoaderStore;
        this.notificationStore = notificationStore;
    }

    setUser = user => {
        this.user = user;
    }

    login = async form => {
        try {
            this.globalLoaderStore.suspend();
            const { email, password } = form.values();
            await this.membershipService.login(this.auth, email, password);
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    register = async form => {
        try {
            this.globalLoaderStore.suspend();
            const { email, password } = form.values();
            await this.membershipService.register(this.auth, email, password);
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    logout = async () => {
        if (!this.isLoggedIn) return;
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

export default UserStore;
