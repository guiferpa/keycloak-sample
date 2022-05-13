import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Profile from './components/Profile';

const App: React.FunctionComponent = () => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return (
      <span>Carregando...</span>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} />} />
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
