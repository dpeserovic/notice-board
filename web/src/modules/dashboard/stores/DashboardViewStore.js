import { CreatorViewStore, ReporterViewStore, NewUserViewStore } from './';

class DashboardViewStore {

    get initFn() {
        switch (this.rootStore.userStore.userRole) {
            case 'creator':
                return this.creatorViewStore.init;
            case 'reporter':
                return this.reporterViewStore.init;
            default:
                return this.newUserViewStore.init;
        }
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.creatorViewStore = new CreatorViewStore(rootStore);
        this.reporterViewStore = new ReporterViewStore(rootStore);
        this.newUserViewStore = new NewUserViewStore(rootStore);
    }

    dispose = () => {
        this.creatorViewStore.dispose();
        this.newUserViewStore.dispose();
    }
}

export default DashboardViewStore;
