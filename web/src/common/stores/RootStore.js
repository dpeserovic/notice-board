import { Baas } from '../baas';
import { RouterStore } from '../router';
import { MenuStore, LoaderStore, NotificationStore, UserStore, AuthStore } from './';
import { MembershipModuleStore } from 'modules/membership/stores';
import { DashboardViewStore } from 'modules/dashboard/stores';

class RootStore {
    constructor(baasConfig) {
        this.baas = new Baas(baasConfig);

        this.routerStore = new RouterStore(this);
        this.menuStore = new MenuStore(this);

        this.globalLoaderStore = new LoaderStore();
        this.notificationStore = new NotificationStore();

        this.userStore = new UserStore(this);
        this.authStore = new AuthStore(this);

        this.membershipModuleStore = new MembershipModuleStore(this);
        this.dashboardViewStore = new DashboardViewStore(this);
    }
}

export default RootStore;
