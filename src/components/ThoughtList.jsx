import React from 'react';
import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';
import { deleteThought } from '../api/thoughts';
import { useEditThought } from '../hooks/usePostThought';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

function ThoughtList({
  thoughts,
  onLike,
  likingId,
  likeError,
  likeErrorId,
  userId,
  setThoughts,
}) {
  const { editThought } = useEditThought();

  const handleDelete = async (id, createdBy) => {
    const token = localStorage.getItem('token');
    console.log('userId:', userId, 'createdBy:', createdBy);
    const isCreator =
      userId && createdBy && (userId === createdBy || userId === createdBy._id);
    if (!isCreator) {
      alert('Only the creator of this thought can delete this thought.');
      return;
    }
    if (
      !window.confirm('Are you sure you want to delete this thought forever?')
    ) {
      return;
    }
    try {
      await deleteThought(id, token);
      setThoughts((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert('Failed to delete thought.');
    }
  };

  const handleEdit = async (id, newMessage) => {
    try {
      const updated = await editThought(id, newMessage);
      setThoughts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t))
      );
    } catch {
      // error is handled in the card
    }
  };

  return (
    <ListWrapper>
      {thoughts.map(({ id, message, likes, createdAt, createdBy }) => (
        <ThoughtCard
          key={id}
          id={id}
          message={message}
          likes={likes}
          createdAt={createdAt}
          onLike={onLike}
          liking={likingId === id}
          error={likeErrorId === id ? likeError : null}
          createdBy={createdBy}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </ListWrapper>
  );
}

export default ThoughtList;
