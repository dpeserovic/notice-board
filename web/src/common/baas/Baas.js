import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';


class Baas {
    constructor(baasConfig) {
        this.app = initializeApp(baasConfig);
        this.auth = getAuth(this.app);
        this.membershipService = this.createMembershipService();
    }

    createMembershipService = () => ({
        login: signInWithEmailAndPassword,
        register: createUserWithEmailAndPassword,
    })
}

export default Baas;
