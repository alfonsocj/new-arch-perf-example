import React from 'react';
import {RenderViewsScreen} from './render-views';
import {useFocusEffect} from '@react-navigation/native';
import { Button } from '../components/button';


export function NavigationScreen(props) {
  const {push} = props.navigation;
  const {name} = props.route ?? {};
  const {screenNumber} = props.route?.params ?? { screenNumber: 1 };
  const metricPrefix = props.metricPrefix ?? 'native_navigation';

  useFocusEffect(() => {
    props.navigation.setOptions({title: `Navigation Screen ${screenNumber}`});
  });

  return (
    <RenderViewsScreen
      {...props}
      route={{...props.route, params: {nodeCount: 10}}}
      metricName={`${metricPrefix}_${screenNumber}`}
      >
      <Button onPress={() => push(name, {screenNumber: screenNumber + 1})}>
        Navigate
      </Button>
    </RenderViewsScreen>
  );
}


