import React from 'react';
import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

function ThoughtList({ thoughts, onLike, likingId, likeError, likeErrorId }) {
  return (
    <ListWrapper>
      {thoughts.map(({ id, message, likes, createdAt }) => (
        <ThoughtCard
          key={id}
          id={id}
          message={message}
          likes={likes}
          createdAt={createdAt}
          onLike={onLike}
          liking={likingId === id}
          error={likeErrorId === id ? likeError : null}
        />
      ))}
    </ListWrapper>
  );
}

export default ThoughtList;
