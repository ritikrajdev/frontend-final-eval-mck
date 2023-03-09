import PropTypes from 'prop-types';
import React from 'react';

import './Button.css';

export default function Button({ children, type }) {
  return (
    <button className='custom-button' type={type}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};
