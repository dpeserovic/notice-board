import { Baas } from '../baas';
import { RouterStore } from '../router';
import { MenuStore, LoaderStore, NotificationStore, UserStore, AuthStore } from './';
import { NoticeBoardService, UserService } from 'common/services';
import { MembershipModuleStore } from 'modules/membership/stores';
import { DashboardViewStore } from 'modules/dashboard/stores';
import { ReporterManagementViewStore } from 'modules/reporter-management/stores';

class RootStore {
    constructor(baasConfig) {
        this.baas = new Baas(baasConfig);

        this.routerStore = new RouterStore(this);
        this.menuStore = new MenuStore(this);

        this.globalLoaderStore = new LoaderStore();
        this.notificationStore = new NotificationStore();

        this.noticeBoardService = new NoticeBoardService(this.baas.db, 'notice-boards');
        this.userService = new UserService(this.baas.db, 'users');

        this.userStore = new UserStore(this);
        this.authStore = new AuthStore(this);

        this.membershipModuleStore = new MembershipModuleStore(this);
        this.dashboardViewStore = new DashboardViewStore(this);
        this.reporterManagementViewStore = new ReporterManagementViewStore(this);
    }
}

export default RootStore;
