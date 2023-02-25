import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './components/PublicRoutes/PublicRoutes';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';
import JobDetail from './pages/JobDetail/JobDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
const Login = lazy(() => import('./pages/Login/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:id" element={<JobDetail />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
