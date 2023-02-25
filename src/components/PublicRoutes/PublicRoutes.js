import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useAuth = () => {
  const token = localStorage.getItem('token');
  let loggedIn = true;
  if (!token || token === '') loggedIn = false;
  return loggedIn;
};

function PublicRoutes() {
  const isAuth = useAuth();
  useEffect(() => {
    if (isAuth) {
      toast.warning(`You don't have access to this page`);
    }
  }, [isAuth]);
  return isAuth ? <Navigate to="/dashboard" replace={true} /> : <Outlet />;
}

export default PublicRoutes;
