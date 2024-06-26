import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import CategorySearchResult from '../screens/CategorySearchResult';

const Stack = createNativeStackNavigator();

const SearchNavigation = (): JSX.Element => {
  return (

    <Stack.Navigator initialRouteName="Favorite">
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
    </Stack.Navigator>
  );
};

export default SearchNavigation;