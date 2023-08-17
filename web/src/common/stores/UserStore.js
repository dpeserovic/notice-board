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

    get hasUserAdditionalInfo() {
        return this.userAdditionalInfo != null;
    }

    get userRole() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.role;
    }

    get userNoticeBoardId() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.noticeBoardId;
    }

    get userDisplayName() {
        return this.hasUserAdditionalInfo && this.userAdditionalInfo.displayName;
    }

    constructor({ baas: { auth, membershipService }, globalLoaderStore, notificationStore, userService }) {
        makeObservable(this, {
            user: observable,
            userAdditionalInfo: observable,
            setUser: action,
            setUserAdditionalInfo: action,
            isLoggedIn: computed,
            userDisplayName: computed,
        });
        this.auth = auth;
        this.membershipService = membershipService;
        this.globalLoaderStore = globalLoaderStore;
        this.notificationStore = notificationStore;
        this.userService = userService;
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
            const { uid, email, metadata: { creationTime: dateCreated } } = response.user;
            await this.userService.create(uid, { email, displayName: email.split('@')[0], dateCreated, role: null, noticeBoardId: null });
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
