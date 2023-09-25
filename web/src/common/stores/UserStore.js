import { makeObservable, observable, computed, action } from 'mobx';

class UserStore {
    user = null;
    userAdditionalInfo = null;

    get isLoggedIn() {
        return this.user != null;
    }

    get userId() {
        return this.isLoggedIn && this.user.uid;
    }

    get userEmail() {
        return this.isLoggedIn && this.user.email;
    }

    get isUserVerified() {
        return this.isLoggedIn && this.user.emailVerified;
    }

    get hasUserAdditionalInfo() {
        return this.userAdditionalInfo != null;
    }

    get isUserApproved() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.isApproved;
    }

    get userRole() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.role;
    }

    get userNoticeBoardId() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.noticeBoardId;
    }

    constructor({ baas: { auth, membershipService }, globalLoaderStore, notificationStore, userService, routerStore: { goTo } }) {
        makeObservable(this, {
            user: observable,
            userAdditionalInfo: observable,
            setUser: action,
            setUserAdditionalInfo: action,
            isLoggedIn: computed,
            userEmail: computed,
            isUserVerified: computed,
            userRole: computed,
        });
        this.auth = auth;
        this.membershipService = membershipService;
        this.globalLoaderStore = globalLoaderStore;
        this.notificationStore = notificationStore;
        this.userService = userService;
        this.goTo = goTo;
    }

    setUser = user => {
        this.user = user;
    }

    setUserAdditionalInfo = userAdditionalInfo => {
        this.userAdditionalInfo = userAdditionalInfo;
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
            const { email: formEmail, password } = form.values();
            const response = await this.membershipService.register(this.auth, formEmail, password);
            const { uid, email, metadata: { creationTime } } = response.user;
            await this.userService.create(uid, { email, creationTime, role: null, noticeBoardId: null, isApproved: false });
            await this.membershipService.sendEmailVerification(this.auth.currentUser);
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    passwordReset = async form => {
        try {
            this.globalLoaderStore.suspend();
            await this.membershipService.sendPasswordResetEmail(this.auth, form.values().email);
            this.goTo('login');
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    sendEmailVerification = async () => {
        try {
            this.globalLoaderStore.suspend();
            await this.membershipService.sendEmailVerification(this.auth.currentUser);
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
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }
}

export default UserStore;
