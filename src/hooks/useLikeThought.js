import { PostLikeThought } from '../api/thoughts';
import { useState } from 'react';

function useLikeThought(onSuccess) {
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);

  const like = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to like a thought.');
      return;
    }
    setLiking(true);
    setError(null);

    PostLikeThought(id, token)
      .then((t) => {
        const mapped = {
          id: t._id,
          message: t.message,
          likes: t.likes,
          createdAt: t.createdAt,
        };
        onSuccess(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLiking(false));
  };

  return { like, loading: liking, error };
}

export default useLikeThought;
