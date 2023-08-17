import { addDoc, collection, getDocs, query, where, getDoc, doc, getCountFromServer, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

class NoticeBoardService {
    constructor(db, base, subcollection) {
        this.db = db;
        this.base = base;
        this.subcollection = subcollection;
    }

    createNoticeBoard(data) {
        return addDoc(collection(this.db, this.base), data);
    }

    getNoticeBoardByCode(code) {
        return getDocs(query(collection(this.db, this.base), where('code', '==', code)));
    }

    getNoticeBoardById(id) {
        return getDoc(doc(this.db, this.base, id));
    }

    getCountOfNotificationsByNoticeBoard(noticeBoardId) {
        return getCountFromServer(collection(this.db, this.base, noticeBoardId, this.subcollection));
    }

    getCountOfNotificationsByAuthorId(noticeBoardId, authorId) {
        return getCountFromServer(query(collection(this.db, this.base, noticeBoardId, this.subcollection), where('authorId', '==', authorId)));
    }

    subscribeToAllNotifications(noticeBoardId, callback) {
        return onSnapshot(query(collection(this.db, this.base, noticeBoardId, this.subcollection)), callback);
    }

    subscribeToUserNotifications(noticeBoardId, id, callback) {
        return onSnapshot(query(collection(this.db, this.base, noticeBoardId, this.subcollection), where('authorId', '==', id)), callback);
    }

    createNotification(noticeBoardId, data) {
        return addDoc(collection(this.db, this.base, noticeBoardId, this.subcollection), data);
    }

    getNotificationById(noticeBoardId, notificationId) {
        return getDoc(doc(this.db, this.base, noticeBoardId, this.subcollection, notificationId));
    }

    updateNotification(noticeBoardId, id, data) {
        return updateDoc(doc(this.db, this.base, noticeBoardId, this.subcollection, id), data);
    }

    deleteNotification(noticeBoardId, id) {
        return deleteDoc(doc(this.db, this.base, noticeBoardId, this.subcollection, id));
    }
}

export default NoticeBoardService;
