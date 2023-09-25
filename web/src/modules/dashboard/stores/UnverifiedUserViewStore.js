class UnverifiedUserViewStore {
    constructor(rootStore) {
        this.userStore = rootStore.userStore;
    }

    init = () => { }

    reload = () => window.location.reload()

    dispose = () => { }
}

export default UnverifiedUserViewStore;
