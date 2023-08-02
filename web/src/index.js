import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { RootStore } from './common/stores';
import { BAAS_CONFIG } from './baasConfig';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const rootStore = window.rootStore = new RootStore(BAAS_CONFIG);
rootStore.routerStore.setObservingRouterStateChanges();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App rootStore={rootStore} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
