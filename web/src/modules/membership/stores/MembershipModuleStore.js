import { LoginViewStore, RegisterViewStore } from './';

class MembershipModuleStore {
    constructor(rootStore) {
        this.loginViewStore = new LoginViewStore(rootStore);
        this.registerViewStore = new RegisterViewStore(rootStore);
    }
}

export default MembershipModuleStore;
