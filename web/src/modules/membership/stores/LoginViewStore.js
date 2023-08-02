import { createForm } from 'common/form';
import { loginFormFields } from '../forms';

class LoginViewStore {
    loginForm = null;

    constructor({ userStore: { login }, notificationStore: { showErrorToast }, routerStore: { goTo } }) {
        this.login = login;
        this.showErrorToast = showErrorToast;
        this.goTo = goTo;
    }

    init = () => {
        this.loginForm = createForm({ fields: loginFormFields, hooks: { onSuccess: this.login, onError: this.handleLoginFormError } });
    }

    handleLoginFormError = () => {
        this.showErrorToast('Invalid form values');
    }

    goToRegister = () => {
        this.goTo('register');
    }

    dispose = () => {
        this.loginForm = null;
    }
}

export default LoginViewStore;
