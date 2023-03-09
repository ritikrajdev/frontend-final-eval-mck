import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedPage from './components/ProtectedPage';
import { ERROR_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from './constants/routes';
import ContentContextProvider from './contexts/ContentContext';
import ErrorContextProvider from './contexts/ErrorContext';
import ModalContextProvider from './contexts/ModalContext';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ErrorContextProvider>
      <ModalContextProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={HOME_ROUTE}
              element={
                <ProtectedPage>
                  <ContentContextProvider>
                    <HomePage />
                  </ContentContextProvider>
                </ProtectedPage>
              }
            />
            <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            <Route
              path={`${ERROR_ROUTE}/:errorCode?`}
              element={<ErrorPage />}
            />
            <Route path='*' element={<ErrorPage notFound={true} />} />
          </Routes>
        </BrowserRouter>
      </ModalContextProvider>
    </ErrorContextProvider>
  );
}

export default App;
