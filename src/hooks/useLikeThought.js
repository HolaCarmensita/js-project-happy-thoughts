import { PostLikeThought } from '../api/thoughts';
import { useState } from 'react';

function useLikeThought(onSuccess) {
  const [error, setError] = useState(null);
  const [errorId, setErrorId] = useState(null);
  const [likingId, setLikingId] = useState(null);

  const like = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to like a thought.');
      setErrorId(id);
      return;
    }
    setLikingId(id);
    setError(null);
    setErrorId(null);

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
      .catch((err) => {
        setError(err.message);
        setErrorId(id);
      })
      .finally(() => setLikingId(null));
  };

  return { like, likingId, error, errorId };
}

export default useLikeThought;
