import { postThought } from '../api/thoughts';
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

export default usePostThought;
