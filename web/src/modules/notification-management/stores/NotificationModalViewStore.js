import { makeObservable, observable, computed, action, runInAction } from 'mobx';
import { createForm } from 'common/form';
import { notificationFormFields } from '../forms';

class NotificationModalViewStore {
    shouldShow = false;
    notificationForm = null;

    get isOpen() {
        return this.shouldShow;
    }

    constructor(rootStore) {
        makeObservable(this, {
            shouldShow: observable,
            notificationForm: observable,
            openModal: action,
            setShouldShow: action,
            dispose: action,
            isOpen: computed,
        })
        this.rootStore = rootStore;
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.noticeBoardService = rootStore.noticeBoardService;
        this.notificationStore = rootStore.notificationStore;
    }

    openModal = async (id = null) => {
        this.setShouldShow(true);
        let notification = null;
        if (id != null) notification = await this.getNotification(id);
        const saveFn = id == null ? this.createNewResource : this.updateResource;
        runInAction(() => this.notificationForm = createForm({ fields: notificationFormFields(this.rootStore, notification), hooks: { onSuccess: (form) => saveFn(form, id), onError: this.handleNotificationFormError } }));
    }

    getNotification = async id => {
        try {
            this.globalLoaderStore.suspend();
            const response = await this.noticeBoardService.getNotificationById(this.rootStore.noticeBoardId, id);
            return response.data();
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    createNewResource = async form => {
        try {
            await this.noticeBoardService.createNotification(this.rootStore.noticeBoardId, { ...form.values(), dateCreated: new Date().toGMTString() });
            this.closeModal();
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        }
    }

    updateResource = async (form, id) => {
        try {
            await this.noticeBoardService.updateNotification(this.rootStore.noticeBoardId, id, form.values());
            this.closeModal();
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        }
    }

    deleteResource = async id => {
        try {
            await this.noticeBoardService.deleteNotification(this.rootStore.noticeBoardId, id);
            this.notificationStore.showSuccessToast('Success');
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        }
    }

    handleNotificationFormError = () => {
        this.notificationStore.showErrorToast('Invalid form values');
    }

    closeModal = () => {
        this.setShouldShow(false);
    }

    setShouldShow = shouldShow => {
        this.shouldShow = shouldShow;
    }

    dispose = () => {
        this.notificationForm = null;
    }
}

export default NotificationModalViewStore;
