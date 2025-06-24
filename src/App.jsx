import styled from 'styled-components';
import { Routes, Route, Link } from 'react-router-dom';
import ThoughtsBoard from './containers/ThoughtsBoard';
import Login from './components/Login';
import About from './components/About';

const AppWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

const Footer = styled.footer`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  text-align: center;
  color: #888;
  font-size: 1rem;
`;

export const App = () => {
  return (
    <AppWrapper>
      <LayoutWrapper>
        <Routes>
          <Route path='/' element={<ThoughtsBoard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer>
          made by Casandra Gustafsson &nbsp;|&nbsp;
          <Link
            to='/about'
            style={{ color: '#6c63ff', textDecoration: 'underline' }}
          >
            About this app
          </Link>
        </Footer>
      </LayoutWrapper>
    </AppWrapper>
  );
};
