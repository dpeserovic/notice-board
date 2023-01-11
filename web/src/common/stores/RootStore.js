import { Baas } from '../baas';
import { RouterStore } from '../router';

class RootStore {
    constructor(baasConfig) {
        this.baas = new Baas(baasConfig);
        this.routerStore = new RouterStore(this);
    }
}

export default RootStore;
