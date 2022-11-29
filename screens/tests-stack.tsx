import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {JsNavigationScreen} from './js-navigation';
import {MenuScreen} from './menu-screen';
import {NavigationScreen} from './navigation';
import {RenderViewsScreen} from './render-views';
import {HeavyScreen} from './heavy-screen';

const Stack = createNativeStackNavigator();

const testMenu = [
  {name: '500 views', screenName: '500-views'},
  {name: '1000 views', screenName: '1000-views'},
  {name: '1500 views', screenName: '1500-views'},
  {name: 'Native navigation', screenName: 'navigation'},
  {name: 'JS navigation', screenName: 'js-navigation'},
  {name: 'Non-Virtualized heavy', screenName: 'heavy-screen', params: {type: 'non-virtualized'}},
  {name: 'Virtualized heavy', screenName: 'heavy-screen', params: {type: 'virtualized'}}
];

export function TestsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tests-menu"
        component={MenuScreen}
        initialParams={{menu: testMenu}}
        options={{title: 'Performance Test'}}
      />
      <Stack.Screen name="heavy-screen" component={HeavyScreen} />
      <Stack.Screen
        name="500-views"
        component={RenderViewsScreen}
        initialParams={{nodeCount: 500}}
      />
      <Stack.Screen
        name="1000-views"
        component={RenderViewsScreen}
        initialParams={{nodeCount: 1000}}
      />
      <Stack.Screen
        name="1500-views"
        component={RenderViewsScreen}
        initialParams={{nodeCount: 1500}}
      />
      <Stack.Screen name="navigation" component={NavigationScreen} />
      <Stack.Screen
        name="js-navigation"
        component={JsNavigationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
