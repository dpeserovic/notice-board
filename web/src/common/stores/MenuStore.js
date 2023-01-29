class MenuStore {

    get menu() {
        return [
            {
                name: 'Creator details',
                route: 'creator-details',
            },
            {
                name: 'Reporter details',
                route: 'reporter-details',
            },
            {
                name: 'Notice board details',
                route: 'notice-board-details',
            },
            {
                name: 'Notification details',
                route: 'notification-details',
            },
        ];
    }

    constructor({ routerStore: { goTo } }) {
        this.goTo = goTo;
    }
}

export default MenuStore;
