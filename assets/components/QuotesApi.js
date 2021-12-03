import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';
import { URL } from '../URL';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SpaceView = styled.View`
  height: 50px;
`;

const ViewWrapper = styled.View`
  display: flex;
  align-items: center;
  margin: 0 auto;
  position: absolute;
`;

const QuoteView = styled.View`
  position: relative;
  border: solid 2px red;
  top: 50px;
  padding: 45px 20px 45px 20px;
  margin: 5px;
  align-items: center;
`;

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
  position: fixed;
  margin: 0 auto;
  align-items: center;
  top: 600px;
`;

const APIButton = styled.TouchableOpacity`
  background-color: #333333;
  height: 80px;
  margin-vertical:40px
  color: whitesmoke;
  width: 400px;
  border-radius: 8px;
`;
const ButtonText = styled.Text`
  font-size: 23px;
  font-weight: 500;
  text-align: center;
  padding-top: 10px;
  color: whitesmoke;
  padding-top: 25px;
`;

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
      <ViewWrapper>
        <SpaceView />
        <MaterialCommunityIcons
          name='thought-bubble-outline'
          size={30}
          color='black'
          bottom='100'
        />
        <QuoteView>
          <QuoteText>{quote.content}</QuoteText>
          <View>Author:{quote.author}</View>
        </QuoteView>

        <MainView>
          <APIButton onPress={generateQuote}>
            <ButtonText>
              <Text>Give me quotes</Text>
            </ButtonText>
          </APIButton>
        </MainView>
      </ViewWrapper>
    </>
  );
};

export default QuotesApi;
