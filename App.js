import React from 'react';
import { ImageBackground, View } from 'react-native';
import styled from 'styled-components/native';
// import { createDrawerNavigator} from '@react-navigation/drawer';
// import { NavigationContainer, DrawerItem } from '@react-navigation/native';
// import 'react-native-gesture-handler';
// import ButtonApi from './assets/components/ButtonApi';
// import ShakeApi from './assets/components/ShakeApi';
import Colour from './assets/components/Colour';
// import LikeColour from './assets/components/LikeColour';

const Container = styled.View`
  flex: 1;
  background-color: papayawhip;
  justify-content: center;
  align-items: center;
`;

const ScreenBackground = styled.ImageBackground`
  height: 100%;
`;

const App = () => {
  // const Drawer = createDrawerNavigator();

  // return (
  //   <NavigationContainer>
  //     <DrawerNavigator initialRouteName='Home'>
  //       <DrawerScreen name='Colour' component={Colour} />
  //       <DrawerScreen name='Saved' component={LikeColour} />
  //     </DrawerNavigator>
  //   </NavigationContainer>
  // );
  return (
    <Container>
      <ImageBackground
        source={require('./assets/pigments.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <ButtonApi />
      <ShakeApi /> */}
        <Colour />
      </ImageBackground>
    </Container>
  );
};

export default App;
