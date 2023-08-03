class MenuStore {

    get menu() {
        return [
            {
                name: 'Reporter management',
                route: 'reporter-management',
            },
        ];
    }

    constructor({ routerStore: { goTo } }) {
        this.goTo = goTo;
    }
}

export default MenuStore;
