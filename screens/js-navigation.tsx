import React from 'react';
import {NavigationScreen} from './navigation';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export function JsNavigationScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="js-navigation-screen" component={NavigationScreen} />
    </Stack.Navigator>
  );
}
