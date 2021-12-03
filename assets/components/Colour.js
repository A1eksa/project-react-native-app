import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Accelerometer } from 'expo-sensors';
import BackgroundImage from './BackgroundImage';

const OverView = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: absolute;
`;

const ChangeColour = styled.TouchableOpacity`
  top: 30px;
  margin-left: 7px;
  width: 90%;
  background-color: #333333;
  height: 80px;
  margin-vertical:40px
  color: whitesmoke;
  width: 400px;
  border-radius: 8px;
`;

const ButtonContainer = styled.View`
  width: 400px;
  top: 300px;
  display: flex;
  flex-direction: row;
`;

const ColorText = styled.Text`
  top: 100px;
  padding-left: 55px;
  position: relative;
  font-size: 21px;
  text-transform: uppercase;
  font-weight: 400;
`;
const containerView = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
const ButtonText = styled.Text`
  color: whitesmoke;
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  margin-top: 20px;
`;

const Colour = () => {
  const [colour, setColour] = useState('#ffffff');
  const [subscription, setSubscription] = useState(null);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const colourCreator = () => {
    const randomColour =
      '#' + Math.floor(Math.random() * 16777215).toString(16);

    setColour(randomColour);
  };

  useEffect(() => {
    colourCreator();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    subscribe();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isShakingEnough(data)) {
      colourCreator();
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

  const isShakingEnough = () => {
    const totalForce = Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z);
    return totalForce > 1.78;
  };

  const { x, y, z } = data;

  return (
    <>
      <BackgroundImage />
      <OverView>
        <View
          style={{
            backgroundColor: `${colour}`,
            top: 100,
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        >
          <ColorText>{colour}</ColorText>
        </View>
        <ButtonContainer>
          <ChangeColour onPress={colourCreator}>
            <ButtonText>Press or Shake</ButtonText>
          </ChangeColour>
        </ButtonContainer>
      </OverView>
    </>
  );
};

export default Colour;
