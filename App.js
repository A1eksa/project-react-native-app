import React from 'react';
import styled from 'styled-components/native';
import ButtonApi from './assets/components/ButtonApi';
import ShakeApi from './assets/components/ShakeApi';

const Container = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <Container>
      <ButtonApi />
      <ShakeApi />
    </Container>
  );
};

export default App;
