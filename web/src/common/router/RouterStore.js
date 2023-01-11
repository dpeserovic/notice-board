import { RouterStore as MobxRouterStore, createRouterState, browserHistory, HistoryAdapter } from 'mobx-state-router';

const routes = [
    {
        name: 'login',
        pattern: '/login',
    },
    {
        name: 'register',
        pattern: '/register',
    },
]

const notFoundState = createRouterState('notFoundState');

class RouterStore {
    constructor(rootStore) {
        this.router = new MobxRouterStore(routes, notFoundState, { rootStore });
        this.setObservingRouterStateChanges();
    }

    setObservingRouterStateChanges = () => {
        const historyAdapter = new HistoryAdapter(this.router, browserHistory);
        historyAdapter.observeRouterStateChanges();
    }
}

export default RouterStore;
