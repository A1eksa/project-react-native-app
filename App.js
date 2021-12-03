import React from 'react';
import { ImageBackground, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, DrawerItem } from '@react-navigation/native';
import 'react-native-gesture-handler';
import QuotesApi from './assets/components/QuotesApi';
import Colour from './assets/components/Colour';
import CatsApi from './assets/components/CatsApi';

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Quotes'>
        <Drawer.Screen name='Quotes' component={QuotesApi} />
        <Drawer.Screen name='Cats' component={CatsApi} />
        <Drawer.Screen name='Color' component={Colour} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
