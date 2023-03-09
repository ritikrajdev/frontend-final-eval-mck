import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/routes';
import { getAuthToken } from '../../utils/auth';

export default function ProtectedPage({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getAuthToken()) {
      navigate(LOGIN_ROUTE);
    }
  });
  return children;
}

ProtectedPage.propTypes = {
  children: PropTypes.node.isRequired,
};
