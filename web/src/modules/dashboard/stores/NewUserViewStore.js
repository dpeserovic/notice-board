import { createForm } from 'common/form';
import { createNoticeBoardFormFields, joinNoticeBoardFormFields } from '../forms';

class NewUserViewStore {
    createNoticeBoardForm = null;
    joinNoticeBoardForm = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.notificationStore = rootStore.notificationStore;
        this.userStore = rootStore.userStore;
        this.noticeBoardService = rootStore.noticeBoardService;
        this.userService = rootStore.userService;
    }

    init = () => {
        this.createNoticeBoardForm = createForm({ fields: createNoticeBoardFormFields(this.rootStore), hooks: { onSuccess: this.handleCreateNoticeBoardSuccess, onError: this.handleCreateNoticeBoardError } });
        this.joinNoticeBoardForm = createForm({ fields: joinNoticeBoardFormFields, hooks: { onSuccess: this.handleJoinNoticeBoardSuccess, onError: this.handleJoinNoticeBoardError } });
    }

    handleCreateNoticeBoardSuccess = async form => {
        try {
            this.globalLoaderStore.suspend();
            const response = await this.noticeBoardService.createNoticeBoard({ ...form.values(), dateCreated: new Date().toGMTString() });
            await this.userService.update(this.userStore.userId, { role: 'creator', noticeBoardId: response.id });
            this.userStore.setUserAdditionalInfo((await this.userService.getById(this.userStore.userId)).data());
            const noticeBoard = await this.noticeBoardService.getNoticeBoardById(response.id);
            this.rootStore.setNoticeBoard(noticeBoard);
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    handleCreateNoticeBoardError = () => {
        this.notificationStore.showErrorToast('Invalid form values');
    }

    handleJoinNoticeBoardSuccess = async form => {
        try {
            this.globalLoaderStore.suspend();
            const response = await this.noticeBoardService.getNoticeBoardByCode(form.values().code);
            if (!response.empty) {
                await this.userService.update(this.userStore.userId, { role: 'reporter', noticeBoardId: response.docs[0].id });
                this.userStore.setUserAdditionalInfo((await this.userService.getById(this.userStore.userId)).data());
                const noticeBoard = await this.noticeBoardService.getNoticeBoardById(response.docs[0].id);
                this.rootStore.setNoticeBoard(noticeBoard);
            } else {
                this.notificationStore.showErrorToast('Unknown notice board code');
            }
        } catch (e) {
            this.notificationStore.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    handleJoinNoticeBoardError = () => {
        this.notificationStore.showErrorToast('Invalid form values');
    }

    dispose = () => {
        this.createNoticeBoardForm = null;
        this.joinNoticeBoardForm = null;
    }
}

export default NewUserViewStore;
