const AUTH_URL = 'http://localhost:8080/api/auth/login';

export const loginUser = async (email, password) => {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
};

export const registerUser = async (email, password) => {
  const response = await fetch('http://localhost:8080/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};
