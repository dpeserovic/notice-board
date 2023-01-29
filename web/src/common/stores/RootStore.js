import { Baas } from '../baas';
import { AuthStore, LoaderStore, NotificationStore, MenuStore } from './';
import { RouterStore } from '../router';
import { MembershipModuleStore } from 'modules/membership/stores';

class RootStore {
    constructor(baasConfig) {
        this.baas = new Baas(baasConfig);
        this.routerStore = new RouterStore(this);
        this.authStore = new AuthStore(this);
        this.globalLoaderStore = new LoaderStore();
        this.notificationStore = new NotificationStore();
        this.membershipModuleStore = new MembershipModuleStore(this);
        this.menuStore = new MenuStore(this);
    }
}

export default RootStore;
