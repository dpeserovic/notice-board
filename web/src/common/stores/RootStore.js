import { RouterStore } from '../router';

class RootStore {
    constructor() {
        this.routerStore = new RouterStore(this);
    }
}

export default RootStore;
