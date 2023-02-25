import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const useAuth = () => {
  const token = localStorage.getItem('token');
  let loggedIn = true;
  if (!token || token === '') loggedIn = false;
  return loggedIn;
};

function PrivateRoutes() {
  const isAuth = useAuth();

  useEffect(() => {
    if (!isAuth) {
      toast.warning(`You don't have access to this page.`);
    }
  }, []);

  return isAuth ? <Outlet /> : <Navigate to="/login" replace={true} />;
}

export default PrivateRoutes;
