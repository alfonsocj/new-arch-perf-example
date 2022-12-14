import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PerformanceObserver} from 'react-native-performance';
import {HeavyScreenWithoutNav} from './screens/heavy-screen';
import {TestsStack} from './screens/tests-stack';

const NAV_ENABLED = false;

export default function App() {
  if (NAV_ENABLED) {
    return (
      <NavigationContainer>
        <TestsStack />
      </NavigationContainer>
    );
  }

  return <HeavyScreenWithoutNav type="non-virtualized" />;
}

export const DEBUG_PERFORMANCE_MARKERS = true;
const measureObserver = new PerformanceObserver(list => {
  const isFabric = global.nativeFabricUIManager !== undefined;
  const arch = isFabric ? 'fabric' : 'paper';

  list.getEntries().forEach(entry => {
    // we use console.error for releases since these are available on iPhone logs
    const log = __DEV__ ? console.log : console.error;
    log(`[${arch}] marker: ${entry.name} took ${entry.duration.toFixed(2)} ms`);
  });
});

if (DEBUG_PERFORMANCE_MARKERS) {
  measureObserver.observe({type: 'measure', buffered: true});
}
