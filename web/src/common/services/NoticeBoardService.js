import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

class NoticeBoardService {
    constructor(db, base) {
        this.db = db;
        this.base = base;
    }

    create(data) {
        return addDoc(collection(this.db, this.base), data);
    }

    get(code) {
        return getDocs(query(collection(this.db, this.base), where('code', '==', code)));
    }
}

export default NoticeBoardService;
