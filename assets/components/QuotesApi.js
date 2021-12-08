import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { URL } from '../URL';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    bottom: 10,
    position: 'relative',
  },
  quoteView: {
    position: 'relative',
    top: 50,
    paddingTop: 45,
    paddingRight: 20,
    paddingBottom: 45,
    paddingLeft: 20,
    margin: 5,
    alignItems: 'center',
    height: 470,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    position: 'absolute',
  },
  quoteText: {
    fontWeight: '700',
    fontSize: 21,
    padding: 35,
    color: 'black',
  },
  authorText: {
    padding: 50,
  },
});

const QuotesApi = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateQuote();
  }, []);
  const generateQuote = () => {
    setLoading(true);
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setQuote(data))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <ActivityIndicator size='large' />;
  }
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.spaceView} />
        <MaterialCommunityIcons
          name='thought-bubble-outline'
          size={30}
          color='black'
        />
        <View style={styles.quoteView}>
          <Text style={styles.quoteText}>{quote.content}</Text>
          <Text style={styles.authorText}>Author:{quote.author}</Text>
        </View>

        <View styles={styles.main}>
          <TouchableOpacity style={styles.button} onPress={generateQuote}>
            <Text styles={styles.buttonText}>Give me quotes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default QuotesApi;
