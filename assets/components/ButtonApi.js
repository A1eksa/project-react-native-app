import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import { URL } from '../URL';

const QuoteText = styled.Text`
  font-weight: 700;
  font-size: 24px;
  padding: 35px;
  color: black;
`;
const AuthorText = styled.Text`
  padding: 50px;
`;

const MainView = styled.View`
  display: flex;
  margin: 0 auto;
  align-items: center;
`;

const APIButton = styled.TouchableOpacity`
  margin-vertical:40px
  background-color: blue;
  height: 45px;
  width: 200px;
  border-radius: 100px;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  padding-top: 10px;
`;

const ButtonApi = () => {
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
    return <ActivityIndicator />;
  }
  return (
    <>
      <View>
        <QuoteText>{quote.content}</QuoteText>
        <Text>Author:{quote.author}</Text>

        <MainView>
          <APIButton onPress={generateQuote}>
            <ButtonText>Give me quotes</ButtonText>
          </APIButton>
        </MainView>
      </View>
    </>
  );
};

export default ButtonApi;
