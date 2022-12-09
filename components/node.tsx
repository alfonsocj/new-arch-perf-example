import React from 'react';
import {View, Text} from 'react-native';

function logOnLayout(name) {
  console.log(`${name} layout measured`);
}

export function Node(props) {
  const title = props.title ?? 'node';
  return (
    <View onLayout={() => logOnLayout(title)}>
      <Text>{title}</Text>
    </View>
  );
}
