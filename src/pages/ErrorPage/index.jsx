import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';

import './ErrorPage.css';

export default function ErrorPage({ notFound }) {
  let { errorCode } = useParams();

  if (typeof errorCode !== 'number') {
    errorCode;
  }

  return (
    <div className='error-container'>
      {notFound ? (
        <>Not Found</>
      ) : (
        <>Error{errorCode ? `: ${errorCode}` : ''}</>
      )}
    </div>
  );
}

ErrorPage.propTypes = {
  notFound: PropTypes.bool,
};

ErrorPage.defaultProps = {
  notFound: false,
};
