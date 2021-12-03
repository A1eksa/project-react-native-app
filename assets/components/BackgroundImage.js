import React from 'react';
import { ImageBackground, Container } from 'react-native';
import styled from 'styled-components/native';

const BackgroundImage = () => {
  return (
    <ImageBackground
      source={require('./pigments.jpg')}
      style={{ width: '100%', height: '100%' }}
    ></ImageBackground>
  );
};

export default BackgroundImage;
