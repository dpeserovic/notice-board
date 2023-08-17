import { makeObservable, observable, action, computed } from 'mobx';
import { LoaderStore } from 'common/stores';

class CreatorViewStore {
    numberOfReporters = null;
    numberOfNotifications = null;

    get reportersCount() {
        return this.numberOfReporters;
    }

    get notificationsCount() {
        return this.numberOfNotifications;
    }

    constructor(rootStore) {
        makeObservable(this, {
            numberOfReporters: observable,
            numberOfNotifications: observable,
            setNumberOfReporters: action,
            setNumberOfNotifications: action,
            dispose: action,
            reportersCount: computed,
            notificationsCount: computed,
        });
        this.rootStore = rootStore;
        this.userService = rootStore.userService;
        this.noticeBoardService = rootStore.noticeBoardService;
        this.notificationStore = rootStore.notificationStore;
        this.loaderStore = new LoaderStore();
    }

    init = async () => {
        try {
            this.loaderStore.suspend();
            const numberOfReporters = await this.userService.getCountOfReportersByNoticeBoard(this.rootStore.noticeBoardId);
            this.setNumberOfReporters(numberOfReporters.data().count);
            const numberOfNotifications = await this.noticeBoardService.getCountOfNotificationsByNoticeBoard(this.rootStore.noticeBoardId);
            this.setNumberOfNotifications(numberOfNotifications.data().count);
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.loaderStore.resume();
        }
    }

    setNumberOfReporters = numberOfReporters => {
        this.numberOfReporters = numberOfReporters;
    }

    setNumberOfNotifications = numberOfNotifications => {
        this.numberOfNotifications = numberOfNotifications;
    }

    dispose() {
        this.numberOfReporters = null;
        this.numberOfNotifications = null;
    }
}

export default CreatorViewStore;
