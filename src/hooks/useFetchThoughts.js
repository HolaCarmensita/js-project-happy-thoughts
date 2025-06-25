import { fetchThoughts } from '../api/thoughts';
import { useState, useEffect } from 'react';

function useFetchThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchThoughts()
      .then((data) => {
        const mapped = data.results.map((t) => ({
          id: t._id,
          message: t.message,
          likes: t.likes,
          createdAt: t.createdAt,
        }));
        setThoughts(mapped);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  //För att kunna ladda om hela listan
  const reload = () => {
    setThoughts([]);
  };

  return {
    thoughts,
    loading,
    error,
    reload,
    setThoughts,
  };
}

export default useFetchThoughts;
