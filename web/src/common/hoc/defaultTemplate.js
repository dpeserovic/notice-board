import React from 'react';
import { useRouterStore } from 'mobx-state-router';

const defaultTemplate = Component => props =>  {
    const { options: { rootStore } } = useRouterStore();
    return <Component {...props} {...rootStore} />;
};

export default defaultTemplate;