import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components/native';
import { Accelerometer } from 'expo-sensors';
import BackgroundImage from './BackgroundImage';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    position: 'absolute',
  },
  button: {
    top: 10,
    marginLeft: 2,
    width: 80,
    backgroundColor: '#333333',
    height: 80,
    marginVertical: 40,
    color: 'whitesmoke',
    width: 400,
    borderRadius: 8,
  },
  buttonText: {
    color: '#9BCBCB',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '500',
    marginTop: 20,
  },
  buttonView: {
    width: 400,
    top: 300,
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    top: 100,
    paddingLeft: 55,
    position: 'relative',
    fontSize: 21,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

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
      <SafeAreaView style={styles.view}>
        <View
          style={{
            backgroundColor: `${colour}`,
            top: 100,
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
        >
          <Text style={styles.text}>{colour}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={colourCreator}>
            <Text style={styles.buttonText}>Press or Shake</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Colour;
