import React, {useMemo} from 'react';
import {Button} from './navigation';
import {
  StyleSheet,
  View,
  ViewProps,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';

type DeepComponentProps = ViewProps & {
  levels: number;
  title?: string;
};

function DeepComponent({levels = 5, ...props}: DeepComponentProps) {
  if (levels === 0) {
    return <Text>{props.title ?? 'node'}</Text>;
  }

  return (
    <View style={styles.borderedView}>
      <DeepComponent levels={levels - 1} {...props} />
    </View>
  );
}

type HeavyScreenContent = ViewProps & {
  type: 'non-virtualized' | 'virtualized';
};

function HeavyScreenContent({type = 'non-virtualized'}) {
  const amountOfViews = 800;
  const viewDepth = 10;

  if (type === 'virtualized') {
    return (
      <FlatList
        style={{flex: 1}}
        data={Array.from({length: amountOfViews})}
        renderItem={({index}) => (
          <DeepComponent levels={viewDepth} title={`node ${index + 1}`} />
        )}
      />
    );
  }

  return (
    <ScrollView>
      {Array.from({length: amountOfViews}).map((_, index) => (
        <DeepComponent
          key={index}
          levels={viewDepth}
          title={`node ${index + 1}`}
        />
      ))}
    </ScrollView>
  );
}

export function HeavyScreen({navigation, route}) {
  const {type} = route.params;

  return (
    <>
      <Button onPress={() => navigation.push('tests-menu')}>
        Navigate to tests
      </Button>
      <HeavyScreenContent type={type} />
    </>
  );
}

const styles = StyleSheet.create({
  borderedView: {
    borderWidth: 1,
    padding: 5,
  },
});
