import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Accelerometer } from 'expo-sensors';

// const styles = StyleSheet.create({});

const OverView = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: absolute;
`;

const ChangeColour = styled.TouchableOpacity`
  top: 50px;

  width: 50%;
  background-color: #262626;
  height: 135px;
  display: flex;
  justify-content: center;
  padding: 5px;
  border-radius: 8px;
  margin: 3px;
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
`;
const containerView = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;
const ButtonText = styled.Text`
  color: white;
  font-size: 23px;
  padding-left: 25px;
`;

const Colour = () => {
  // const peach = require('../assets/peach.jpg');
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
      <OverView>
        <View
          style={{
            position: 'relative',
            top: '100px',
            backgroundColor: `${colour}`,
            minHeight: '205px',
            minWidth: '205px',
            borderRadius: '100px',
            border: 'solid 2px white',
            margin: '3px',
          }}
        >
          <ColorText>{colour}</ColorText>
        </View>
        {/* <Text>Data x:{x}</Text>
        <Text>Data y:{y}</Text>
        <Text>Data z:{z}</Text> */}

        <ButtonContainer>
          <ChangeColour onPress={colourCreator}>
            <ButtonText>press/shake</ButtonText>
          </ChangeColour>
          <ChangeColour onPress={() => navigator.clipboard.writeText(colour)}>
            <ButtonText>copy colour</ButtonText>
          </ChangeColour>
        </ButtonContainer>
      </OverView>
    </>
  );
};

export default Colour;
