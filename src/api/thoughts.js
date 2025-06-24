const API_URL = 'http://localhost:8080/api/thoughts';

export const fetchThoughts = async (page = 1, limit = 5) => {
  const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
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
