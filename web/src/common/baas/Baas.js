import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


class Baas {
    constructor(baasConfig) {
        this.app = initializeApp(baasConfig);
        this.auth = getAuth(this.app);
        this.membershipService = this.createMembershipService();
        this.authStateObserver = onAuthStateChanged;
        this.db = getFirestore(this.app);
    }

    createMembershipService = () => ({
        login: signInWithEmailAndPassword,
        register: createUserWithEmailAndPassword,
        sendEmailVerification,
        signOut,
    })
}

export default Baas;
