import React from 'react';
import {NavigationScreen} from './navigation';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function Screen(props) {
  return <NavigationScreen {...props} metricPrefix="js_navigation" />
}

export function JsNavigationScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="js-navigation-screen" component={Screen} />
    </Stack.Navigator>
  );
}
