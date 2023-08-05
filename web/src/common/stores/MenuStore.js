class MenuStore {

    get menu() {
        return [
            {
                name: 'Reporter details',
                route: 'reporter-details',
            },
        ];
    }

    constructor({ routerStore: { goTo } }) {
        this.goTo = goTo;
    }
}

export default MenuStore;
