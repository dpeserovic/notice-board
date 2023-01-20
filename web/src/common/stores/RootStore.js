import { Baas } from '../baas';
import { AuthStore, LoaderStore, NotificationStore } from './';
import { RouterStore } from '../router';
import { MembershipModuleStore } from 'modules/membership/stores';

class RootStore {
    constructor(baasConfig) {
        this.baas = new Baas(baasConfig);
        this.authStore = new AuthStore(this);
        this.routerStore = new RouterStore(this);
        this.globalLoaderStore = new LoaderStore();
        this.notificationStore = new NotificationStore();
        this.membershipModuleStore = new MembershipModuleStore(this);
    }
}

export default RootStore;
