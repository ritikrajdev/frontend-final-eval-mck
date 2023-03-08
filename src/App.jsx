import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ERROR_ROUTE, HOME_ROUTE } from './constants/routes';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage notFound={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
