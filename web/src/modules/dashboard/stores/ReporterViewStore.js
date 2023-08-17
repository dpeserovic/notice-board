import { makeObservable, observable, action, computed } from 'mobx';
import { LoaderStore } from 'common/stores';

class ReporterViewStore {
    numberOfMyNotifications = null;

    get myNotificationsCount() {
        return this.numberOfMyNotifications;
    }

    constructor(rootStore) {
        makeObservable(this, {
            numberOfMyNotifications: observable,
            setNumberOfMyNotifications: action,
            dispose: action,
            myNotificationsCount: computed,
        });
        this.rootStore = rootStore;
        this.userStore = rootStore.userStore;
        this.noticeBoardService = rootStore.noticeBoardService;
        this.notificationStore = rootStore.notificationStore;
        this.loaderStore = new LoaderStore();
    }

    init = async () => {
        try {
            this.loaderStore.suspend();
            const numberOfMyNotifications = await this.noticeBoardService.getCountOfNotificationsByAuthorId(this.rootStore.noticeBoardId, this.userStore.userId);
            this.setNumberOfMyNotifications(numberOfMyNotifications.data().count);
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.loaderStore.resume();
        }
    }

    setNumberOfMyNotifications = numberOfMyNotifications => {
        this.numberOfMyNotifications = numberOfMyNotifications;
    }

    dispose = () => {
        this.numberOfMyNotifications = null;
    }
}

export default ReporterViewStore;
