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

function ThoughtForm({ onNewThought, disabled, error }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; //Om meddelandet är tomt gör inget för tillfället
    onNewThought(input.trim());
    setInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>What’s making you happy right now?</FormLabel>

      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Share a happy thought...'
      ></Textarea>
      <Button type='submit' disabled={disabled}>
        {/* {disabled ? 'Sending…' : 'Send'} */}
        <img src='/heart.png' alt='heart emoji' />
        Send Happy Thought
        <img src='/heart.png' alt='heart emoji' />
      </Button>
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Form>
  );
}

export default ThoughtForm;
