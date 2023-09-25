import { makeObservable, observable, action, computed } from 'mobx';
import { LoaderStore } from 'common/stores';

class CreatorViewStore {
    numberOfReporters = null;
    numberOfNotifications = null;
    numberOfMyNotifications = null;

    get reportersCount() {
        return this.numberOfReporters;
    }

    get notificationsCount() {
        return this.numberOfNotifications;
    }

    get myNotificationsCount() {
        return this.numberOfMyNotifications;
    }

    constructor(rootStore) {
        makeObservable(this, {
            numberOfReporters: observable,
            numberOfNotifications: observable,
            numberOfMyNotifications: observable,
            setNumberOfReporters: action,
            setNumberOfNotifications: action,
            setNumberOfMyNotifications: action,
            dispose: action,
            reportersCount: computed,
            notificationsCount: computed,
            myNotificationsCount: computed,
        });
        this.rootStore = rootStore;
        this.userStore = rootStore.userStore;
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
            const numberOfMyNotifications = await this.noticeBoardService.getCountOfNotificationsByAuthorId(this.rootStore.noticeBoardId, this.userStore.userId);
            this.setNumberOfMyNotifications(numberOfMyNotifications.data().count);
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

    setNumberOfMyNotifications = numberOfMyNotifications => {
        this.numberOfMyNotifications = numberOfMyNotifications;
    }

    dispose() {
        this.numberOfReporters = null;
        this.numberOfNotifications = null;
        this.numberOfMyNotifications = null;
    }
}

export default CreatorViewStore;
