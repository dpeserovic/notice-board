import { RouterStore as MobxRouterStore, createRouterState, browserHistory, HistoryAdapter } from 'mobx-state-router';

const routes = [
    {
        name: 'login',
        pattern: '/login',
        beforeEnter: (fromState, toState, routerStore) => {
            const { options: { rootStore: { membershipModuleStore: { loginViewStore: { init } } } } } = routerStore;
            init();
        },
        onExit: (fromState, toState, routerStore) => {
            const { options: { rootStore: { membershipModuleStore: { loginViewStore: { dispose } } } } } = routerStore;
            dispose();
        },
    },
    {
        name: 'register',
        pattern: '/register',
        beforeEnter: (fromState, toState, routerStore) => {
            const { options: { rootStore: { membershipModuleStore: { registerViewStore: { init } } } } } = routerStore;
            init();
        },
        onExit: (fromState, toState, routerStore) => {
            const { options: { rootStore: { membershipModuleStore: { registerViewStore: { dispose } } } } } = routerStore;
            dispose();
        },
    },
    {
        name: 'dashboard',
        pattern: '/dashboard',
        beforeEnter: (fromState, toState, routerStore) => {
            const { options: { rootStore: { dashboardViewStore: { initFn } } } } = routerStore;
            if (!routerStore.options.rootStore.userStore.isLoggedIn) return Promise.reject();
            initFn();
        },
        onExit: (fromState, toState, routerStore) => {
            const { options: { rootStore: { dashboardViewStore: { dispose } } } } = routerStore;
            dispose();
        },
    },
    {
        name: 'reporter-management',
        pattern: '/reporter-management',
        beforeEnter: (fromState, toState, routerStore) => {
            const { options: { rootStore: { reporterManagementViewStore: { init } } } } = routerStore;
            if (!routerStore.options.rootStore.userStore.isLoggedIn) return Promise.reject();
            init();
        },
        onExit: (fromState, toState, routerStore) => {
            const { options: { rootStore: { reporterManagementViewStore: { dispose } } } } = routerStore;
            dispose();
        },
    },
    {
        name: 'notFound',
        pattern: 'not-found',
    },
]

const notFoundState = createRouterState('notFound');

class RouterStore {
    constructor(rootStore) {
        this.router = new MobxRouterStore(routes, notFoundState, { rootStore });
    }

    setObservingRouterStateChanges = () => {
        const historyAdapter = new HistoryAdapter(this.router, browserHistory);
        historyAdapter.observeRouterStateChanges();
    }

    goTo = (routeName, options) => {
        this.router.goTo(routeName, options);
    }
}

export default RouterStore;
