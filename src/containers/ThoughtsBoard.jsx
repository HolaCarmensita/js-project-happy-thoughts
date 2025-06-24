// src/containers/ThoughtsBoard.jsx
import React from 'react';
import useFetchThoughts from '../hooks/useFetchThoughts';
import usePostThought from '../hooks/usePostThought';
import useLikeThought from '../hooks/useLikeThought';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { addUniqueSortedThought } from '../utils/thoughtUtils';
import { useNavigate } from 'react-router-dom';

export default function ThoughtsBoard() {
  const {
    thoughts,
    loading,
    error: fetchError,
    setThoughts,
    page,
    setPage,
    totalPages,
  } = useFetchThoughts();

  const {
    sendThought,
    posting,
    error: postError,
  } = usePostThought((newThought) => {
    setThoughts((prev) => addUniqueSortedThought(prev, newThought));
  });

  const {
    like,
    loading: liking,
    error: likeError,
    errorId: likeErrorId,
  } = useLikeThought((updatedThought) => {
    // // 🧪 Fakes error för ett specifikt id:
    // if (updatedThought.id === '684828c66c268fe1534fb6c0') {
    //   throw new Error('Fake like error');
    // }
    setThoughts((prev) =>
      prev.map(
        (t) =>
          t.id === updatedThought.id
            ? updatedThought // byt ut hela objektet
            : t // låt övriga vara oförändrade
      )
    );
  });

  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      window.location.reload();
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={handleAuthClick}
          style={{
            padding: '0.5rem 1.2rem',
            background: '#ffadad',
            color: '#222',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
      <ThoughtForm
        onNewThought={sendThought}
        disabled={posting}
        error={postError}
      />

      {loading && <p>Loading…</p>}

      {!loading && fetchError && (
        <p style={{ textAlign: 'center', color: 'gray' }}>No posts yet</p>
      )}

      {!loading && !fetchError && (
        <ThoughtList
          thoughts={thoughts}
          onLike={like}
          liking={liking}
          likeError={likeError}
          likeErrorId={likeErrorId}
        />
      )}

      {!loading && page < totalPages && (
        <button onClick={() => setPage((prev) => prev + 1)}>
          Visa fler tankar
        </button>
      )}
    </>
  );
}
