import React, {useMemo, useRef, useState, useCallback} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import performance from 'react-native-performance';

function useRunOnce(callback: () => void) {
  const isCalled = useRef(false).current;
  if (!isCalled.current) {
    callback();
    isCalled.current = true;
  }
}

export function RenderViewsScreen({route, children}) {
  const {nodeCount} = route?.params ?? {};
  const measureName = route?.name;
  const markName = `${measureName}_start`;
  const finishedMeasurement = useRef(false);
  const [markerDuration, setMarkerDuration] = useState();

  useRunOnce(() => {
    performance.mark(markName);
  });

  const endPerformanceMarker = useCallback(() => {
    if (finishedMeasurement.current) {
      return;
    }

    finishedMeasurement.current = true;
    performance.measure(measureName, markName);
    const entries = performance.getEntriesByName(measureName);
    const entry = entries[entries.length - 1] || {duration: 0, name: ''};
    const duration = `marker: ${entry.name} took ${entry.duration.toFixed(
      2,
    )} ms`;
    setMarkerDuration(duration);
  }, []);

  const views = useMemo(
    () =>
      Array.from({length: nodeCount ?? 1}).map((_, index) => (
        <View key={index} style={styles.view}>
          <Text
            style={styles.text}
            onLayout={() => {
              if (index === nodeCount - 1) {
                endPerformanceMarker();
              }
            }}>
            node {index + 1}
          </Text>
        </View>
      )),
    [nodeCount],
  );

  return (
    <ScrollView style={styles.container}>
      {markerDuration !== undefined && (
        <View style={styles.markerContainer}>
          <Text style={styles.markerText}>{markerDuration}</Text>
        </View>
      )}
      <View style={styles.viewsContainer}>{views}</View>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  viewsContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  view: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
  },
  text: {
    color: 'black',
  },
  markerContainer: {
    padding: 15,
  },
  markerText: {
    color: 'orange',
    fontWeight: 'bold',
  },
});
