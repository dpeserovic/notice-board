import { makeObservable, observable, computed, action, runInAction } from 'mobx';

class LoaderStore {
    loading = observable.box(false);
    suspendTimeout = null;

    get isLoading() {
        return this.loading.get();
    }

    constructor() {
        makeObservable(this, {
            suspend: action,
            resume: action,
            isLoading: computed,
        });
    }

    suspend = () => {
        this.suspendTimeout = setTimeout(() => runInAction(() => this.loading.set(true)), 100);
    }

    resume = () => {
        clearTimeout(this.suspendTimeout);
        this.suspendTimeout = null;
        this.loading.set(false);
    }

}

export default LoaderStore;
