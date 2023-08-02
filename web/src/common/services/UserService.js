import { setDoc, doc, getDoc } from 'firebase/firestore';

class UserService {
    constructor(db, base) {
        this.db = db;
        this.base = base;
    }

    create(id, data) {
        return setDoc(doc(this.db, this.base, id), data);
    }

    get(id) {
        return getDoc(doc(this.db, this.base, id));
    }
}

export default UserService;
