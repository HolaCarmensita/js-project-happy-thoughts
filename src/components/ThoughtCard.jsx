import React from 'react';
import styled, { keyframes } from 'styled-components';
import { format, formatDistanceToNow, isToday } from 'date-fns';

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: solid black 1px;
  padding: 1.5rem;
  box-shadow: 12px 12px var(--color-black);
  animation: ${appear} 0.4s ease-out;
`;

const Message = styled.p`
  font-size: 16px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-dark-grey);
`;

const CardLike = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMsg = styled.p`
  color: red;
  font-weight: bold;
  font-size: 14px;
  margin-top: 0.5rem;
  animation: ${appear} 0.3s ease-out;
`;

const CardTime = styled.p``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey);
  border-radius: 50%;
  border: none;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  img {
    width: 1.3rem;
    height: auto;
  }
`;

function ThoughtCard({ id, message, likes, createdAt, onLike, liking, error }) {
  const date = new Date(createdAt);

  const displayTime = isToday(date)
    ? `Today ${format(date, 'h:mm a')}` // t.ex. "Today 12:30 PM"
    : formatDistanceToNow(date, { addSuffix: true }); // t.ex. "2 days ago"

  return (
    <Card>
      <Message>{message}</Message>
      <CardContent>
        <CardLike>
          <Button onClick={() => onLike(id)} disabled={liking}>
            <img src='/heart.png' alt='heart emoji' />
          </Button>
          <span>x</span>
          <span>{likes}</span>
        </CardLike>
        <CardTime>{displayTime}</CardTime>
      </CardContent>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Card>
  );
}

export default ThoughtCard;
