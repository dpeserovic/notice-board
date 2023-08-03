import { addDoc, collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';

class NoticeBoardService {
    constructor(db, base) {
        this.db = db;
        this.base = base;
    }

    create(data) {
        return addDoc(collection(this.db, this.base), data);
    }

    getByCode(code) {
        return getDocs(query(collection(this.db, this.base), where('code', '==', code)));
    }

    getById(id) {
        return getDoc(doc(this.db, this.base, id));
    }
}

export default NoticeBoardService;
