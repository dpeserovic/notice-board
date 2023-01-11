import { initializeApp } from 'firebase/app';

class Baas {
    constructor(baasConfig) {
        this.app = initializeApp(baasConfig);
    }
}

export default Baas;
