import { makeObservable, action } from 'mobx';

class AuthStore {
    constructor({ baas: { auth, authStateObserver }, userStore: { setUser }, routerStore: { goTo } }) {
        makeObservable(this, {
            nextOrObserver: action,
        });
        this.auth = auth;
        this.authStateObserver = authStateObserver;
        this.unsubscribeAuthStateObserver = this.setAuthStateObserver();
        this.setUser = setUser;
        this.goTo = goTo;
    }

    setAuthStateObserver = () => this.authStateObserver(this.auth, this.nextOrObserver)

    nextOrObserver = user => {
        if (user != null) {
            this.setUser(user);
            this.goTo('dashboard');
        } else {
            this.setUser(null);
            this.goTo('login');
        }
    };
}

export default AuthStore;
