import React from 'react';
import { useRouterStore } from 'mobx-state-router';
import { observer } from 'mobx-react';

const defaultTemplate = Component => props => {
    const { options: { rootStore } } = useRouterStore();
    const ObserverComponent = observer(Component);
    return <ObserverComponent {...props} {...rootStore} />;
};

export default defaultTemplate;
