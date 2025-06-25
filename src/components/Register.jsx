import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { registerUser } from '../api/auth';

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const RegisterForm = styled.form`
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
    background: #ff6f61;
    color: #fff;
  }
`;

const ErrorMsg = styled.div`
  color: #d32f2f;
  margin-top: 0.5rem;
`;

const LoginLink = styled(Link)`
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { accessToken } = await registerUser(email, password);
      localStorage.setItem('token', accessToken);
      navigate('/');
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterWrapper>
      <h2>Sign Up</h2>
      <RegisterForm onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type='submit'>Sign Up</Button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <LoginLink to='/login'>Already have an account? Login</LoginLink>
      </RegisterForm>
    </RegisterWrapper>
  );
};

export default Register;
