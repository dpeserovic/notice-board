import React from 'react';
import { RouterContext, RouterView } from 'mobx-state-router';
import { MainLayout } from 'common/components';
import { LoginPage, RegisterPage } from 'modules/membership/pages';
import { DashboardPage } from 'modules/dashboard/pages';
import { ReporterManagement } from 'modules/reporter-management/pages';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const routeNames = {
  login: <LoginPage />,
  register: <RegisterPage />,
  dashboard: <DashboardPage />,
  'reporter-management': <ReporterManagement />,
  notFound: <NotFound />,
}

function App({ rootStore }) {
  const { routerStore: { router } } = rootStore;
  return (
    <RouterContext.Provider value={router}>
      <MainLayout>
        <RouterView viewMap={routeNames} />
        <ToastContainer />
      </MainLayout>
    </RouterContext.Provider>
  );
}

export default App;
