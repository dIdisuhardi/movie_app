import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

export type RootStackParamList = {
  Home: undefined;
  MovieDetail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

export default HomeStackNavigation;