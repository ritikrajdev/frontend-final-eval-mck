import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../constants/routes';
import { getAuthToken } from '../../utils/auth';

export default function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const [useEffectCalled, setUseEffectCalled] = useState(false);
  useEffect(() => {
    if (!getAuthToken()) {
      navigate(LOGIN_ROUTE);
    }
    setUseEffectCalled(true);
  });
  if (!useEffectCalled) {
    return 'Initializing...';
  }
  return children;
}

ProtectedPage.propTypes = {
  children: PropTypes.node.isRequired,
};
