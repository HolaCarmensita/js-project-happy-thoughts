import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Form = styled.form`
  background-color: var(--color-grey);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid black;
  box-shadow: 12px 12px var(--color-black);
`;

const FormLabel = styled.label`
  font-family: var(--font-ui);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 1rem;
  border: 2px solid var(--color-dark-grey);
  background-color: #f8f8f8;
  resize: none;
`;

const Button = styled.button`
  background-color: var(--color-red);
  font-family: var(--font-ui);
  width: fit-content;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  img {
    width: 1.3rem;
    height: auto;
  }
  &:hover {
    background: rgb(198, 91, 91);
    color: #fff;
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorMsg = styled.p`
  color: #d32f2f;
  font-weight: bold;
  font-size: 14px;
  margin-top: 0.5rem;
  animation: ${appear} 0.3s ease-out;
`;

const CharCounter = styled.div`
  align-self: flex-end;
  font-size: 0.95rem;
  color: ${({ $overLimit }) => ($overLimit ? '#d32f2f' : '#888')};
  font-weight: ${({ $overLimit }) => ($overLimit ? 'bold' : 'normal')};
  margin-bottom: -0.5rem;
`;

function ThoughtForm({ onNewThought, disabled, error }) {
  const [input, setInput] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (input.trim().length < 5 || input.trim().length > 140) {
      setLocalError('The thought must be between 5 and 140 characters');
      return;
    }
    setLocalError('');
    onNewThought(input.trim());
    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    if (localError) setLocalError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>What's making you happy right now?</FormLabel>

      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder='Share a happy thought...'
      ></Textarea>
      <CharCounter $overLimit={input.length > 140}>
        {input.length} / 140
      </CharCounter>
      <Button type='submit' disabled={disabled}>
        <img src='/heart.png' alt='heart emoji' />
        Send Happy Thought
        <img src='/heart.png' alt='heart emoji' />
      </Button>
      {(localError || error) && <ErrorMsg>{localError || error}</ErrorMsg>}
    </Form>
  );
}

export default ThoughtForm;
