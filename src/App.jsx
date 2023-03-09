import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ERROR_ROUTE, LOGIN_ROUTE } from './constants/routes';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<LoginPage />} />
        <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage notFound={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
