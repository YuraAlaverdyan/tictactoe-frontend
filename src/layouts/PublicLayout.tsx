import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

const PublicLayout: React.FC = () => {
  const token = useAuth();
  return !token ? <Outlet /> : <Navigate to="/game" />;
};

export default PublicLayout;