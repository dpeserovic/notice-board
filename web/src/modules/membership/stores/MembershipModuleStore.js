import { LoginViewStore, RegisterViewStore, PasswordResetViewStore } from './';

class MembershipModuleStore {
    constructor(rootStore) {
        this.loginViewStore = new LoginViewStore(rootStore);
        this.registerViewStore = new RegisterViewStore(rootStore);
        this.passwordResetViewStore = new PasswordResetViewStore(rootStore);
    }
}

export default MembershipModuleStore;
