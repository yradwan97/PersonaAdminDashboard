import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import PageLoading from './components/shared/loading/pageLoading/PageLoading';

import App from './App';
import store from './store';

const root = createRoot(document.querySelector("#root"));

root.render(
  <React.Suspense fallback={<PageLoading />}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.Suspense>
);
