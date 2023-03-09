import PropTypes from 'prop-types';
import React from 'react';

import './Input.css';

export default function Input({
  label,
  type,
  onChange,
  name,
  placeholder,
  value,
  disabled,
}) {
  return (
    <div className='custom-input'>
      <label>{label}</label>
      <br />
      <input
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};
