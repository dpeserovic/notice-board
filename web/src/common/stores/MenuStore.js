class MenuStore {

    get menu() {
        return [
            {
                name: 'Dashboard',
                route: 'dashboard',
                hasPermission: () => true,
            },
            {
                name: 'Reporter details',
                route: 'reporter-details',
                hasPermission: () => this.userStore.userRole === 'creator',
            },
            {
                name: 'Notification management',
                route: 'notification-management',
                hasPermission: () => this.userStore.isUserApproved,
            },
        ];
    }

    constructor({ userStore, routerStore: { goTo } }) {
        this.userStore = userStore;
        this.goTo = goTo;
    }
}

export default MenuStore;
