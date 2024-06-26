import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import CategorySearchResult from '../screens/CategorySearchResult';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const SearchNavigation = (): JSX.Element => {
  return (

    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={Search }
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategorySearchResult"
        component={CategorySearchResult}
        options={{ headerShown: true, title: 'Category Search Result' }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ title: 'Movie Details' }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;