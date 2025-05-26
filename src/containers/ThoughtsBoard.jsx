// src/containers/ThoughtsBoard.jsx
import useFetchThoughts from '../hooks/useFetchThoughts';
import usePostThought from '../hooks/usePostThought';
import useLikeThought from '../hooks/useLikeThought';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';

export default function ThoughtsBoard() {
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
    setThoughts((prev) => [newThought, ...prev]);
  });
  const {
    like,
    loading: liking,
    error: likeError,
  } = useLikeThought((updatedThought) => {
    setThoughts((prev) =>
      prev.map(
        (t) =>
          t.id === updatedThought.id
            ? updatedThought // byt ut hela objektet
            : t // låt övriga vara oförändrade
      )
    );
  });

  return (
    <>
      {/* Formulär */}
      <ThoughtForm
        onNewThought={sendThought}
        disabled={posting}
        error={postError && 'Could not post, please try again'}
      />

      {/* Lista eller fallback */}
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
        />
      )}
    </>
  );
}
