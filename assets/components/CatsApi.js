import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { URL_CATS } from '../URL';
import { CurrentRenderContext } from '@react-navigation/native';

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    position: 'absolute',
    backgroundColor: '#f3f3f3',
  },
  main: {
    top: 130,
  },
});

// const ViewWrapper = styled.View`
//   display: flex;
//   align-items: center;
//   margin: 0 auto;
//   position: absolute;
// `;

// const MainView = styled.View`
//   display: flex;
//   position: fixed;
//   margin: 0 auto;
//   align-items: center;
//   top: 600px;
// `;

// const ButtonContainer = styled.View`
//   width: 400px;
//   top: 300px;
//   display: flex;
//   flex-direction: row;
// `;
// const ChangeCat = styled.TouchableOpacity`
//   top: 10px;
//   margin-left: 7px;
//   width: 90%;
//   background-color: #333333;
//   height: 80px;
//   margin-vertical:40px
//   color: whitesmoke;
//   width: 400px;
//   border-radius: 8px;
// `;
// const ButtonText = styled.Text`
//   color: whitesmoke;
//   text-align: center;
//   font-size: 23px;
//   font-weight: 500;
//   margin-top: 20px;
// `;

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
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: animal.file }}
        style={{ width: 320, height: 320, borderRadius: 10, margin: 40 }}
      />

      <View style={styles.main}>
        <TouchableOpacity style={styles.button} onPress={generateCat}>
          <Text style={styles.buttonText}>Press or Shake</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CatsApi;
