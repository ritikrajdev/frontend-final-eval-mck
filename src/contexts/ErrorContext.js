import PropTypes from 'prop-types';
import React, { createContext } from 'react';

export const ErrorContext = createContext([]);

export default function ErrorContextProvider({ children }) {
  const [error, setError] = React.useState(null);

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);
  }

  return (
    <ErrorContext.Provider value={[error, setError]}>
      {error && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            backgroundColor: 'white',
            display: 'inline-block',
            padding: '20px',
            borderRadius: '8px',
            color: 'red',
            border: '1px solid black',
          }}
        >
          {error}
        </div>
      )}
      {children}
    </ErrorContext.Provider>
  );
}

ErrorContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
