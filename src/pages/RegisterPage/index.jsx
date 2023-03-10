import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import circleWhite from '../../assets/images/circle_white.svg';
import uploadIllustration from '../../assets/images/undraw_upload.svg';
import Button from '../../components/elements/Button';
import Input from '../../components/elements/Input';
import { registerApiEndpoint } from '../../constants/apiEndpoints';
import { ERROR_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../../constants/routes';
import { getAuthToken } from '../../utils/auth';
import { makeRequest } from '../../utils/makeRequest';
import './RegisterPage.css';

export default function RegisterPage() {
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (getAuthToken()) navigate(HOME_ROUTE);
  }, []);

  async function register(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      await makeRequest(registerApiEndpoint, {
        data: {
          email,
          password,
        },
      });

      navigate(LOGIN_ROUTE);
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
    <div className='register-page'>
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

      <div className='register'>
        <h2>Register Now !</h2>
        <form onSubmit={register}>
          <Input label='Email' type='email' name='email' />
          <br />
          <Input label='Password' type='password' name='password' />
          <br />
          <p style={{ padding: '0 10px', color: 'red' }}>{error}</p>
          <br />
          <center>
            <Button type='submit'>Register</Button>
          </center>
          <br />
          <br />
          <center>
            <Link to={LOGIN_ROUTE}>login</Link>
          </center>
        </form>
      </div>
    </div>
  );
}
