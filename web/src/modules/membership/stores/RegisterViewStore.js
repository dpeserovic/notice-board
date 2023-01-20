import { createForm } from 'common/form';
import { registerFormFields } from '../forms';

class RegisterViewStore {
    registerForm = null;

    constructor(rootStore) {
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.auth = rootStore.authStore.auth;
        this.membershipService = rootStore.authStore.membershipService;
        this.notificationStore = rootStore.notificationStore;
        this.routerStore = rootStore.routerStore;
    }

    init = () => {
        this.registerForm = createForm({ fields: registerFormFields, hooks: { onSuccess: this.handleRegisterFormSuccess, onError: this.handleRegisterFormError } });
    }

    handleRegisterFormSuccess = async form => {
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

    handleRegisterFormError = () => {
        this.notificationStore.showErrorToast('Invalid form values');
    }

    goToLogin = () => {
        this.routerStore.goTo('login');
    }

    dispose = () => {
        this.registerForm = null;
    }
}

export default RegisterViewStore;
