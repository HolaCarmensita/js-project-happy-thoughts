import { fetchThoughts } from '../api/thoughts';
import { useState, useEffect } from 'react';

function useFetchThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchThoughts(page)
      .then((data) => {
        const mapped = data.results.map((t) => ({
          id: t._id,
          message: t.message,
          likes: t.likes,
          createdAt: t.createdAt,
        }));
        setThoughts((prev) => { //Hantera dubletter skapat av lokalt sparade thoughts som sedan hämtas igenfrån backend.
          const onlyUnique = mapped.filter(
            (t) => !prev.some((p) => p.id === t.id)
          );
          return [...prev, ...onlyUnique];
        });
        setTotalPages(data.totalPages);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  //För att kunna ladda om hela listan
  const reload = () => {
    setThoughts([]);
    setPage(1);
  };

  return {
    thoughts,
    loading,
    error,
    reload,
    page,
    setPage,
    totalPages,
    setThoughts,
  };
}

export default useFetchThoughts;
