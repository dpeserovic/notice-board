import { makeObservable, observable, action } from 'mobx';

class ReporterDetailsViewStore {
    unsubscribeFn = null;
    reporters = null;

    constructor(rootStore) {
        makeObservable(this, {
            reporters: observable,
            handleSnapshotMessage: action,
            dispose: action,
        });
        this.rootStore = rootStore;
        this.globalLoaderStore = rootStore.globalLoaderStore;
        this.showErrorToast = rootStore.notificationStore.showErrorToast;
        this.userService = rootStore.userService;
    }

    init = () => {
        this.unsubscribeFn = this.userService.subscribeToReportersByNoticeBoard(this.rootStore.noticeBoard.id, this.handleSnapshotMessage);
    }

    handleSnapshotMessage = snapshot => {
        if (this.reporters != null) {
            snapshot.docChanges().forEach(i => {
                if (i.type === 'added') {
                    this.reporters.unshift({ ...i.doc.data(), id: i.doc.id });
                } else {
                    const idx = this.reporters.findIndex(r => r.id === i.doc.id);
                    if (idx === -1) return;
                    if (i.type === 'modified') {
                        this.reporters[idx] = { ...i.doc.data(), id: i.doc.id };
                    } else {
                        this.reporters.splice(idx, 1);
                    }
                }
            });
        } else {
            this.reporters = snapshot.docChanges().map(i => ({ ...i.doc.data(), id: i.doc.id }));
        }
    }

    toggleApproval = async ({ id, isApproved }) => {
        try {
            this.globalLoaderStore.suspend();
            await this.userService.update(id, { isApproved: !isApproved });
        } catch (e) {
            this.showErrorToast('Error');
        } finally {
            this.globalLoaderStore.resume();
        }
    }

    dispose = () => {
        if (this.unsubscribeFn != null) this.unsubscribeFn();
        this.unsubscribeFn = null;
        this.reporters = null;
    }
}

export default ReporterDetailsViewStore;
