import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  TouchableHighlight,
  Text,
  StyleSheet,
  View,
} from 'react-native';
interface MenuItemProp {
  name: string;
  screenName: string;
  params?: Record<string, string>;
}

function MenuItem({name, screenName, params}: MenuItemProp) {
  const {navigate} = useNavigation();

  return (
    <TouchableHighlight
      underlayColor="#eee"
      onPress={() => navigate(screenName, params)}>
      <View style={styles.menuItem}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export function MenuScreen({route}) {
  const menu = route.params.menu ?? [];

  return (
    <FlatList
      style={styles.container}
      data={menu}
      renderItem={({item}) => <MenuItem {...item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  menuItem: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 15,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});
