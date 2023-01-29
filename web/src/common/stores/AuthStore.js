class AuthStore {
    constructor({ baas: { auth, membershipService, authStateObserver }, routerStore: { goTo } }) {
        this.auth = auth;
        this.membershipService = membershipService;
        this.authStateObserver = authStateObserver;
        this.unsubscribeAuthStateObserver = this.setAuthStateObserver();
        this.goTo = goTo;
    }

    setAuthStateObserver = () => this.authStateObserver(this.auth, this.nextOrObserver)

    nextOrObserver = user => this.goTo(user != null ? 'dashboard' : 'login');
}

export default AuthStore;
