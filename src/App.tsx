import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

import './index.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
  </Provider>;
}

export default App;
