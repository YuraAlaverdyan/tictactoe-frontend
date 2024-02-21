import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';

import './index.scss';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
