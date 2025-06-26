import React, { useState } from 'react';
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
  position: relative;
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
  transition: transform 0.15s;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    transform: scale(1.15);
  }
  img {
    width: 1.3rem;
    height: auto;
  }
`;

const TrashButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #d32f2f;
  z-index: 2;
  transition: color 0.2s, background 0.2s, transform 0.15s;
  transform-origin: center;
  &:hover {
    transform: scale(1.15);
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 2.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c63ff;
  z-index: 2;
  transition: color 0.2s, background 0.2s, transform 0.15s;
  transform-origin: center;
  &:hover {
    transform: scale(1.15);
  }
`;

const EditActionButton = styled.button`
  padding: 0.75rem;
  background: #ffadad;
  color: #222;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
  &:hover {
    background: rgb(198, 91, 91);
    color: #fff;
  }
`;

function ThoughtCard({
  id,
  message,
  likes,
  createdAt,
  onLike,
  liking,
  error,
  createdBy,
  onDelete,
  onEdit,
}) {
  const [deleteError, setDeleteError] = useState('');
  const [editError, setEditError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(message);
  const date = new Date(createdAt);

  const displayTime = isToday(date)
    ? `Today ${format(date, 'h:mm a')}` // t.ex. "Today 12:30 PM"
    : formatDistanceToNow(date, { addSuffix: true }); // t.ex. "2 days ago"

  const handleDeleteClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    const isCreator = userId && createdBy && userId === createdBy._id;
    if (isCreator) {
      setDeleteError('');
      onDelete && onDelete(id, createdBy);
    } else {
      setDeleteError('Only the creator of the thought can delete it');
    }
  };

  const handleEditClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;
    const isCreator = userId && createdBy && userId === createdBy._id;
    if (isCreator) {
      setEditError('');
      setIsEditing(true);
      setEditValue(message);
    } else {
      setEditError('Oh, only the creator of the thought can edit it');
    }
  };

  const handleEditSave = () => {
    if (editValue.trim().length < 5 || editValue.trim().length > 140) {
      setEditError('The thought must be between 5 and 140 characters');
      return;
    }
    setEditError('');
    onEdit && onEdit(id, editValue.trim());
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditError('');
    setEditValue(message);
  };

  return (
    <Card>
      {!isEditing && (
        <>
          <EditButton title='Edit this thought' onClick={handleEditClick}>
            📝
          </EditButton>
          <TrashButton title='Delete this thought' onClick={handleDeleteClick}>
            🗑️
          </TrashButton>
        </>
      )}
      {isEditing ? (
        <>
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{ width: '100%', minHeight: 60, marginBottom: 8 }}
            maxLength={140}
          />
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <EditActionButton type='button' onClick={handleEditSave}>
              Save
            </EditActionButton>
            <EditActionButton
              type='button'
              onClick={handleEditCancel}
              style={{ background: '#eee', color: '#222' }}
            >
              Cancel
            </EditActionButton>
          </div>
        </>
      ) : (
        <Message>{message}</Message>
      )}
      {createdBy && createdBy.email && (
        <div
          style={{ color: '#888', fontSize: '0.95rem', marginBottom: '0.5rem' }}
        >
          by {createdBy.email}
        </div>
      )}
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
      {(error || deleteError || editError) && (
        <ErrorMsg>{error || deleteError || editError}</ErrorMsg>
      )}
    </Card>
  );
}

export default ThoughtCard;
