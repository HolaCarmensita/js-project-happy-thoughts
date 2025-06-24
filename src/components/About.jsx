import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  color: #6c63ff;
  text-decoration: underline;
  font-size: 1rem;
  &:hover {
    color: #4834d4;
  }
`;

const About = () => (
  <AboutWrapper>
    <h2>About HappyThoughts</h2>
    <p>
      HappyThoughts is a simple app for sharing and liking positive messages.
      Log in to post your own thoughts or like others, or explore as a guest to
      see what others have shared!
    </p>
    <BackLink to='/'>← Back to HappyThoughts</BackLink>
  </AboutWrapper>
);

export default About;
