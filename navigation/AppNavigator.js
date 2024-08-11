import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/MainScreen';
import CalorieCalculator from '../components/CalorieCalculator';
import Diary from '../components/Diary';
import FoodSearch from '../components/FoodSearch';
import FoodDetails from '../components/FoodDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="CalorieCalculator" component={CalorieCalculator} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="FoodSearch" component={FoodSearch} />
        <Stack.Screen name="FoodDetails" component={FoodDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
