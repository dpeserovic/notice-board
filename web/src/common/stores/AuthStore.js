class AuthStore {
    constructor({ baas: { auth, membershipService } }) {
        this.auth = auth;
        this.membershipService = membershipService;
    }
}

export default AuthStore;
