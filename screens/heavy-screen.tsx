import React, {useState, useCallback} from 'react';
import {Button} from '../components/button';
import {
  StyleSheet,
  View,
  ViewProps,
  Text,
  FlatList,
  ScrollView,
} from 'react-native';
import performance from 'react-native-performance';
import { DeepComponent } from '../components/deep-component';


interface HeavyScreenProps {
  type: 'non-virtualized' | 'virtualized';
  amountOfViews?: number;
  viewDepth?: number;
}

type HeavyScreenContent = ViewProps & HeavyScreenProps;

function HeavyScreenContent({type = 'non-virtualized', amountOfViews = 800, viewDepth = 10}) {

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

export function HeavyScreenWithoutNav(props: HeavyScreenProps) {
  const [nodes, setNodes] = useState([]);
  const measureName = 'heavy-screen-no-nav';
  const markName = `${measureName}_start`;
  const [markerDuration, setMarkerDuration] = useState();

  const appendNode = useCallback(() => {
    performance.mark(markName);
    setNodes(nodes => [...nodes, <DeepComponent key={nodes.length} levels={5} title={nodes.length} />]);
  }, [nodes]);

  const endPerformanceMarker = useCallback(() => {
    performance.measure(measureName, markName);
    const entries = performance.getEntriesByName(measureName);
    const entry = entries[entries.length - 1] || {duration: 0, name: ''};
    const duration = `marker: ${entry.name} took ${entry.duration.toFixed(
      2,
    )} ms`;
    setMarkerDuration(duration);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button onPress={appendNode}>Append node</Button>
      {nodes.length > 0 && <View onLayout={endPerformanceMarker}>{nodes}</View>}
      <Text style={styles.markerText}>{markerDuration}</Text>
      <HeavyScreenContent {...props} />
    </View>
  );
}

export function HeavyScreen({navigation, route}) {
  const {type} = route.params;

  return (
    <View style={{flex: 1}}>
      <Button onPress={() => navigation.push('tests-menu')}>
        Navigate to tests
      </Button>
      <HeavyScreenContent type={type} />
    </View>
  );
}

const styles = StyleSheet.create({
  markerText: {
    color: 'orange',
    fontWeight: 'bold',
  },
});
