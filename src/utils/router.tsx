import React from 'react';

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Game, Home, Signup } from 'pages';
import ProtectedLayout from 'layouts/ProtectedLayout';
import PublicLayout from 'layouts/PublicLayout';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route element={<ProtectedLayout />}>
        <Route path="/game" element={<Game />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </React.Fragment>,
  ),
);
