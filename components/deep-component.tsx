import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { Node } from './node';

type DeepComponentProps = ViewProps & {
  levels: number;
  title?: string;
};

export function DeepComponent({levels = 5, ...props}: DeepComponentProps) {
  if (levels === 0) {
    return <Node title={props.title} />;
  }

  return (
    <View style={styles.borderedView}>
      <DeepComponent levels={levels - 1} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  borderedView: {
    borderWidth: 1,
    padding: 5,
  },
});
