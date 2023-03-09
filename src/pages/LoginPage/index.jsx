import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import circleWhite from '../../assets/images/circle_white.svg';
import uploadIllustration from '../../assets/images/undraw_upload.svg';
import Button from '../../components/elements/Button';
import Input from '../../components/elements/Input';
import { loginApiEndpoint } from '../../constants/apiEndpoints';
import { ERROR_ROUTE, HOME_ROUTE } from '../../constants/routes';
import { getAuthToken, setAuthToken } from '../../utils/auth';
import { makeRequest } from '../../utils/makeRequest';
import './LoginPage.css';

export default function LoginPage() {
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken()) navigate(HOME_ROUTE);
  }, []);

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const { token } = await makeRequest(loginApiEndpoint, {
        data: {
          email,
          password,
        },
      });

      console.log(token);
      setAuthToken(token);

      navigate(HOME_ROUTE);
    } catch (error) {
      console.log(error);
      if (Math.floor(error.response?.status / 100) === 4) {
        setError(error.response.data.message);
      } else {
        navigate(ERROR_ROUTE);
      }
    }
  }

  return (
    <div className='login-page'>
      <div className='app-info'>
        <img
          src={circleWhite}
          style={{
            top: '10px',
            right: '10px',
          }}
        />
        <img
          src={circleWhite}
          style={{
            top: '120px',
            right: '120px',
            width: '100px',
            height: '100px',
          }}
        />
        <h1>
          DESIGN APIs fast,
          <br />
          Manage content easily.
        </h1>

        <img className='img-illustration' src={uploadIllustration} alt='' />

        <img
          src={circleWhite}
          style={{
            bottom: '10px',
            left: '120px',
            width: '100px',
            height: '100px',
          }}
        />
        <img
          src={circleWhite}
          style={{
            bottom: '80px',
            left: '10px',
          }}
        />
      </div>

      <div className='login'>
        <h2>Log in to your account</h2>
        <form onSubmit={login}>
          <Input label='Email' type='email' name='email' />
          <br />
          <Input label='Password' type='password' name='password' />
          <br />
          <p style={{ padding: '0 10px', color: 'red' }}>{error}</p>
          <br />
          <center>
            <Button type='submit'>Log in</Button>
          </center>
        </form>
      </div>
    </div>
  );
}
