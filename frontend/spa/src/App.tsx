import React from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Profile from './components/Profile';
import * as OAuth from './components/oauth';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/oauth/auth/callback' element={<OAuth.AuthCallback />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
