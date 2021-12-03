import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { Accelerometer } from 'expo-sensors';
import { URL_CATS } from '../URL';

const ViewWrapper = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: absolute;
`;

const MainView = styled.View`
  display: flex;
  position: fixed;
  margin: 0 auto;
  align-items: center;
  top: 600px;
`;

const ButtonContainer = styled.View`
  width: 400px;
  top: 300px;
  display: flex;
  flex-direction: row;
`;
const ChangeCat = styled.TouchableOpacity`
  top: 10px;
  margin-left: 7px;
  width: 90%;
  background-color: #333333;
  height: 80px;
  margin-vertical:40px
  color: whitesmoke;
  width: 400px;
  border-radius: 8px;
`;
const ButtonText = styled.Text`
  color: whitesmoke;
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  margin-top: 20px;
`;

const CatsApi = () => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [animal, setAnimal] = useState({});

  useEffect(() => {
    generateCat();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isShakingEnough(data)) {
      generateCat();
    }
  }, [data]);

  const subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const generateCat = () => {
    setLoading(true);
    fetch(URL_CATS)
      .then((res) => res.json())
      .then((data) => setAnimal(data))
      .finally(() => setLoading(false));
  };

  const isShakingEnough = (data) => {
    const totalForce = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);
    return totalForce > 1.78;
  };

  const { x, y, z } = data;

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ViewWrapper>
      <Image
        source={{ uri: animal.file }}
        style={{ width: 320, height: 320, borderRadius: 10, margin: 40 }}
      />

      <MainView>
        <ChangeCat onPress={generateCat}>
          <ButtonText>Press or Shake</ButtonText>
        </ChangeCat>
      </MainView>
    </ViewWrapper>
  );
};

export default CatsApi;
