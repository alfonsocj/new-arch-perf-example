import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';
import { PerformanceObserver } from 'react-native-performance';
import { MenuScreen } from './screens/menu-screen';
import {RenderViewsScreen} from './screens/render-views';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="menu" component={MenuScreen} options={{title: 'Performance Test'}}/>
        <Stack.Screen name="500-views" component={RenderViewsScreen} initialParams={{ nodeCount: 500 }} />
        <Stack.Screen name="1000-views" component={RenderViewsScreen} initialParams={{ nodeCount: 1000 }} />
        <Stack.Screen name="1500-views" component={RenderViewsScreen} initialParams={{ nodeCount: 1500 }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const DEBUG_PERFORMANCE_MARKERS = true;
const measureObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // we use console.error for releases since these are available on iPhone logs
    const log = __DEV__ ? console.log : console.error;
    log(`marker: ${entry.name} took ${entry.duration.toFixed(2)} ms`);
  });
});

if (DEBUG_PERFORMANCE_MARKERS) {
  measureObserver.observe({ type: 'measure', buffered: true });
}
