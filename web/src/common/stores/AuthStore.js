import { makeObservable, action } from 'mobx';

class AuthStore {
    constructor({ baas: { auth, authStateObserver }, userStore: { setUser, setUserAdditionalInfo }, userService, routerStore: { goTo } }) {
        makeObservable(this, {
            nextOrObserver: action,
        });
        this.auth = auth;
        this.authStateObserver = authStateObserver;
        this.unsubscribeAuthStateObserver = this.setAuthStateObserver();
        this.setUser = setUser;
        this.setUserAdditionalInfo = setUserAdditionalInfo;
        this.userService = userService;
        this.goTo = goTo;
    }

    setAuthStateObserver = () => this.authStateObserver(this.auth, this.nextOrObserver)

    nextOrObserver = async user => {
        if (user != null) {
            this.setUser(user);
            this.setUserAdditionalInfo((await this.userService.get(user.uid)).data());
            this.goTo('dashboard');
        } else {
            this.setUser(null);
            this.setUserAdditionalInfo(null);
            this.goTo('login');
        }
    };
}

export default AuthStore;
