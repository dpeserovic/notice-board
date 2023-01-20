import { createForm } from 'common/form';
import { loginFormFields } from '../forms';

class LoginViewStore {
    loginForm = null;

    constructor(rootStore) {
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.auth = rootStore.authStore.auth;
        this.membershipService = rootStore.authStore.membershipService;
        this.notificationStore = rootStore.notificationStore;
        this.routerStore = rootStore.routerStore;
    }

    init = () => {
        this.loginForm = createForm({ fields: loginFormFields, hooks: { onSuccess: this.handleLoginFormSuccess, onError: this.handleLoginFormError } })
    }

    handleLoginFormSuccess = async form => {
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

    handleLoginFormError = () => {
        this.notificationStore.showErrorToast('Invalid form values');
    }

    goToRegister = () => {
        this.routerStore.goTo('register');
    }

    dispose = () => {
        this.loginForm = null;
    }
}

export default LoginViewStore;
