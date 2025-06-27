const API_URL = 'https://hola-happy-server.onrender.com/api/thoughts';

export const fetchThoughts = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch thoughts');
  return response.json();
};

export const postThought = async (message, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Failed to post thought');
  return response.json();
};

export const PostLikeThought = async (id, token) => {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}/${id}/likes`, {
    method: 'POST',
    headers,
  });
  if (!response.ok) throw new Error('Failed to like thought');
  return response.json();
};

export const deleteThought = async (id, token) => {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) throw new Error('Failed to delete thought');
  return response.json();
};

export const updateThought = async (id, message, token) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Failed to update thought');
  return response.json();
};
