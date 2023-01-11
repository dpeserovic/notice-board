import React from 'react';
import { RouterContext, RouterView } from 'mobx-state-router';
import { MainLayout } from 'common/components';
import { LoginPage, RegisterPage } from './modules/membership/pages';

const routeNames = {
  login: <LoginPage />,
  register: <RegisterPage />,
}

function App({ rootStore }) {
  const { routerStore: { router } } = rootStore;
  return (
    <RouterContext.Provider value={router}>
      <MainLayout>
        <RouterView viewMap={routeNames} />
      </MainLayout>
    </RouterContext.Provider>
  );
}

export default App;
