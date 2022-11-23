import React from 'react';
import {RenderViewsScreen} from './render-views';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

interface ButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

export function Button({children, onPress}: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

export function NavigationScreen(props) {
  const {push} = props.navigation;
  const {name} = props.route ?? {};
  const {screenNumber} = props.route?.params ?? { screenNumber: 1};

  useFocusEffect(() => {
    props.navigation.setOptions({title: `Navigation Screen ${screenNumber}`});
  });

  return (
    <RenderViewsScreen
      {...props}
      route={{...props.route, params: {nodeCount: 10}}}>
      <Button onPress={() => push(name, {screenNumber: screenNumber + 1})}>
        Navigate
      </Button>
    </RenderViewsScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#165AF8',
    borderRadius: 15,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});
