import { setDoc, doc, updateDoc, getDoc, getCountFromServer, getDocs, query, collection, where, onSnapshot } from 'firebase/firestore';

class UserService {
    constructor(db, base) {
        this.db = db;
        this.base = base;
    }

    create(id, data) {
        return setDoc(doc(this.db, this.base, id), data);
    }

    update(id, data) {
        return updateDoc(doc(this.db, this.base, id), data);
    }

    getById(id) {
        return getDoc(doc(this.db, this.base, id));
    }

    getCountOfReportersByNoticeBoard(noticeBoardId) {
        return getCountFromServer(query(collection(this.db, this.base), where('noticeBoardId', '==', noticeBoardId), where('role', '==', 'reporter')));
    }

    getReportersByNoticeBoardId(noticeBoardId) {
        return getDocs(query(collection(this.db, this.base), where('noticeBoardId', '==', noticeBoardId), where('role', '==', 'reporter')));
    }

    subscribeToReportersByNoticeBoard(noticeBoardId, callback) {
        return onSnapshot(query(collection(this.db, this.base), where('noticeBoardId', '==', noticeBoardId), where('role', '==', 'reporter')), callback);
    }

    getUsersByNoticeBoardId(noticeBoardId) {
        return getDocs(query(collection(this.db, this.base), where('noticeBoardId', '==', noticeBoardId)));
    }
}

export default UserService;
