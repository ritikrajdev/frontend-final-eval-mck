import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/routes';
import { removeAuthToken } from '../../utils/auth';

import './SignOutButton.css';

export default function SignOutButton() {
  const navigate = useNavigate();

  return (
    <button
      className='sign-out-button'
      onClick={() => {
        removeAuthToken();
        navigate(LOGIN_ROUTE);
      }}
    >
      Sign Out
    </button>
  );
}
