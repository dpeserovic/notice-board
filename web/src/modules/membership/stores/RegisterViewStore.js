import { createForm } from 'common/form';
import { registerFormFields } from '../forms';

class RegisterViewStore {
    registerForm = null;

    constructor({ userStore: { register }, notificationStore: { showErrorToast }, routerStore: { goTo } }) {
        this.register = register;
        this.showErrorToast = showErrorToast;
        this.goTo = goTo;
    }

    init = () => {
        this.registerForm = createForm({ fields: registerFormFields, hooks: { onSuccess: this.register, onError: this.handleRegisterFormError } });
    }

    handleRegisterFormError = () => {
        this.showErrorToast('Invalid form values');
    }

    goToLogin = () => {
        this.goTo('login');
    }

    dispose = () => {
        this.registerForm = null;
    }
}

export default RegisterViewStore;
