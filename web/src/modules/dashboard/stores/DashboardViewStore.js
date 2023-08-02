import { createForm } from 'common/form';
import { createNoticeBoardFormFields, joinNoticeBoardFormFields } from '../forms';

class DashboardViewStore {
    createNoticeBoardForm = null;
    joinNoticeBoardForm = null;

    get initFn() {
        return this.userStore.hasUserAdditionalInfo ? this.init : this.initNewUser;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.notificationStore = rootStore.notificationStore;
        this.userStore = rootStore.userStore;
        this.noticeBoardService = rootStore.noticeBoardService;
        this.userService = rootStore.userService;
    }

    initNewUser = () => {
        const handleCreateNoticeBoardSuccess = async form => {
            try {
                this.globalLoaderStore.suspend();
                const response = await this.noticeBoardService.create(form.values());
                await this.userService.create(this.userStore.userId, { role: 'creator', noticeBoardId: response.id });
                this.userStore.setUserAdditionalInfo((await this.userService.get(this.userStore.userId)).data());
            } catch (e) {
                this.notificationStore.showErrorToast('Error');
            } finally {
                this.globalLoaderStore.resume();
            }
        }
        const handleCreateNoticeBoardError = () => {
            this.notificationStore.showErrorToast('Invalid form values');
        }

        const handleJoinNoticeBoardSuccess = async form => {
            try {
                this.globalLoaderStore.suspend();
                const response = await this.noticeBoardService.get(form.values().code);
                if (!response.empty) {
                    await this.userService.create(this.userStore.userId, { role: 'reporter', noticeBoardId: response.docs[0].id });
                    this.userStore.setUserAdditionalInfo((await this.userService.get(this.userStore.userId)).data());
                } else {
                    this.notificationStore.showErrorToast('Unknown notice board code');
                }
            } catch (e) {
                this.notificationStore.showErrorToast('Error');
            } finally {
                this.globalLoaderStore.resume();
            }
        }
        const handleJoinNoticeBoardError = () => {
            this.notificationStore.showErrorToast('Invalid form values');
        }

        this.createNoticeBoardForm = createForm({ fields: createNoticeBoardFormFields(this.rootStore), hooks: { onSuccess: handleCreateNoticeBoardSuccess, onError: handleCreateNoticeBoardError } });
        this.joinNoticeBoardForm = createForm({ fields: joinNoticeBoardFormFields, hooks: { onSuccess: handleJoinNoticeBoardSuccess, onError: handleJoinNoticeBoardError } });
    }

    init = () => { }

    dispose = () => {
        this.createNoticeBoardForm = null;
        this.joinNoticeBoardForm = null;
    }
}

export default DashboardViewStore;
