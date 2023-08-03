import { setDoc, doc, updateDoc, getDoc, getDocs, query, collection, where } from 'firebase/firestore';

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

    getReportersByNoticeBoardId(noticeBoardId) {
        return getDocs(query(collection(this.db, this.base), where('noticeBoardId', '==', noticeBoardId), where('role', '==', 'reporter')));
    }
}

export default UserService;
