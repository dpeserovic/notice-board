import { createForm } from 'common/form';
import { passwordResetFormFields } from '../forms';

class PasswordResetViewStore {
    passwordResetForm = null;

    constructor({ userStore: { passwordReset }, notificationStore: { showErrorToast }, routerStore: { goTo } }) {
        this.passwordReset = passwordReset;
        this.showErrorToast = showErrorToast;
        this.goTo = goTo;
    }

    init = () => {
        this.passwordResetForm = createForm({ fields: passwordResetFormFields, hooks: { onSuccess: this.passwordReset, onError: this.handlePasswordResetFormError } });
    }

    handlePasswordResetFormError = () => {
        this.showErrorToast('Invalid form values');
    }

    goToLogin = () => {
        this.goTo('login');
    }

    dispose = () => {
        this.passwordResetForm = null;
    }
}

export default PasswordResetViewStore;
