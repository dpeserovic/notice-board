import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';


class Baas {
    constructor(baasConfig) {
        this.app = initializeApp(baasConfig);
        this.auth = getAuth(this.app);
        this.membershipService = this.createMembershipService();
        this.authStateObserver = onAuthStateChanged;
    }

    createMembershipService = () => ({
        login: signInWithEmailAndPassword,
        register: createUserWithEmailAndPassword,
        signOut,
    })
}

export default Baas;
