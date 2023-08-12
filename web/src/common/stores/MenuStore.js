class MenuStore {

    get menu() {
        return [
            {
                name: 'Reporter details',
                route: 'reporter-details',
            },
            {
                name: 'Notification management',
                route: 'notification-management',
            },
        ];
    }

    constructor({ routerStore: { goTo } }) {
        this.goTo = goTo;
    }
}

export default MenuStore;
