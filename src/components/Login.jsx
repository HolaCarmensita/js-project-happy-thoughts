import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../api/auth';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 350px;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #ffadad;
  color: #222;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: rgb(198, 91, 91);
    color: #fff;
  }
`;

const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-top: 0.5rem;
`;

const GuestLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  text-align: center;
  color: #6c63ff;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #4834d4;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  margin-top: 0.5rem;
  text-align: center;
  color: #6c63ff;
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: #4834d4;
  }
`;

const OrSeparator = styled.div`
  text-align: center;
  color: #888;
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { accessToken, id } = await loginUser(email, password);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify({ id }));
      navigate('/');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <LoginWrapper>
      <h2>Login</h2>
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          <input
            type='checkbox'
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>
        <Button type='submit'>Login</Button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <GuestLink to='/'>explore HappyThoughts as guest</GuestLink>
        <OrSeparator>or</OrSeparator>
        <RegisterLink to='/register'>Sign up</RegisterLink>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;
