// src/containers/ThoughtsBoard.jsx
import React from 'react';
import useFetchThoughts from '../hooks/useFetchThoughts';
import usePostThought from '../hooks/usePostThought';
import useLikeThought from '../hooks/useLikeThought';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { addUniqueSortedThought } from '../utils/thoughtUtils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuthButton = styled.button`
  padding: 0.5rem 1.2rem;
  background: #ffadad;
  color: #222;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: rgb(198, 91, 91);
    color: #fff;
  }
`;

export default function ThoughtsBoard() {
  console.log('ThoughtsBoard mounted');
  const {
    thoughts,
    loading,
    error: fetchError,
    setThoughts,
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
    likingId,
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

  // Get user ID from localStorage (set after login/register)
  let userId = null;
  try {
    const userData = JSON.parse(localStorage.getItem('user'));
    userId = userData?.id || null;
  } catch {
    userId = null;
  }

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
        <AuthButton onClick={handleAuthClick}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </AuthButton>
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
          likingId={likingId}
          likeError={likeError}
          likeErrorId={likeErrorId}
          userId={userId}
          setThoughts={setThoughts}
        />
      )}
    </>
  );
}
