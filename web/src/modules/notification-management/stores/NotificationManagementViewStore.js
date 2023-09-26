import { makeObservable, observable, action } from 'mobx';

class NotificationManagementViewStore {
    noticeBoardUsers = null;
    unsubscribeFn = null;
    notifications = null;

    get isUserCreator() {
        return this.userStore.userRole === 'creator';
    }

    constructor(rootStore) {
        makeObservable(this, {
            notifications: observable,
            handleSnapshotMessage: action,
            dispose: action,
        });
        this.rootStore = rootStore;
        this.userStore = rootStore.userStore;
        this.userService = rootStore.userService;
        this.noticeBoardService = rootStore.noticeBoardService;
    }

    init = async () => {
        this.noticeBoardUsers = (await this.userService.getUsersByNoticeBoardId(this.rootStore.noticeBoardId)).docs.map(i => ({ ...i.data(), id: i.id }));
        this.unsubscribeFn = this.isUserCreator ?
            this.noticeBoardService.subscribeToAllNotifications(this.rootStore.noticeBoardId, this.handleSnapshotMessage)
            :
            this.noticeBoardService.subscribeToUserNotifications(this.rootStore.noticeBoardId, this.userStore.userId, this.handleSnapshotMessage);
    }

    handleSnapshotMessage = snapshot => {
        if (this.notifications != null) {
            snapshot.docChanges().forEach(i => {
                if (i.type === 'added') {
                    const docData = i.doc.data();
                    const idx = this.noticeBoardUsers.findIndex(i => i.id === docData.authorId);
                    this.notifications.unshift({ ...docData, id: i.doc.id, author: idx != -1 ? this.noticeBoardUsers[idx].email : 'Unknown' });
                } else {
                    const idx = this.notifications.findIndex(n => n.id === i.doc.id);
                    if (idx === -1) return;
                    if (i.type === 'modified') {
                        const docData = i.doc.data();
                        const authorIdx = this.noticeBoardUsers.findIndex(i => i.id === docData.authorId);
                        this.notifications[idx] = { ...docData, id: i.doc.id, author: authorIdx != -1 ? this.noticeBoardUsers[authorIdx].email : 'Unknown' };
                    } else {
                        this.notifications.splice(idx, 1);
                    }
                }
            });
        } else {
            this.notifications = snapshot.docChanges().map(i => {
                const docData = i.doc.data();
                const idx = this.noticeBoardUsers.findIndex(i => i.id === docData.authorId);
                return {
                    ...docData,
                    id: i.doc.id,
                    author: idx != -1 ? this.noticeBoardUsers[idx].email : 'Unknown'
                }
            });
        }
    }

    dispose = () => {
        if (this.unsubscribeFn != null) this.unsubscribeFn();
        this.unsubscribeFn = null;
        this.notifications = null;
    }
}

export default NotificationManagementViewStore;
