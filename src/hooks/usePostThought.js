import { postThought, updateThought } from '../api/thoughts';
import { useState } from 'react';

function usePostThought(onSuccess) {
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);

  const sendThought = (message) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to post a thought.');
      return;
    }
    setPosting(true);
    postThought(message, token)
      .then((t) => {
        const mapped = {
          id: t._id,
          message: t.message,
          likes: t.likes,
          createdAt: new Date(t.createdAt),
          createdBy: t.createdBy,
        };
        setError(null);
        onSuccess(mapped);
      })
      .catch((error) => {
        setError(error.message || 'Something went wrong');
      })
      .finally(() => setPosting(false));
  };

  return { sendThought, loading: posting, error };
}

export const useEditThought = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editThought = async (id, message) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const updated = await updateThought(id, message, token);
      setLoading(false);
      return updated;
    } catch (err) {
      setError(err.message || 'Failed to update thought');
      setLoading(false);
      throw err;
    }
  };

  return { editThought, loading, error };
};

export default usePostThought;
