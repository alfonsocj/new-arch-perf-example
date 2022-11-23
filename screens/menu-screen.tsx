import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, TouchableHighlight, Text, StyleSheet, View} from 'react-native';

const menu = [
  {name: '500 views', screenName: '500-views'},
  {name: '1000 views', screenName: '1000-views'},
  {name: '1500 views', screenName: '1500-views'},
  {name: 'Native navigation', screenName: 'navigation'},
  {name: 'JS navigation', screenName: 'js-navigation'},
];

interface MenuItemProp {
    name: string;
    screenName: string;
}

function MenuItem({name, screenName}: MenuItemProp) {
  const {navigate} = useNavigation();

  return (
    <TouchableHighlight 
    underlayColor='#eee' 
    onPress={() => navigate(screenName)}>
      <View style={styles.menuItem}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

export function MenuScreen() {
  return (
    <FlatList style={styles.container} data={menu} renderItem={({item}) => <MenuItem {...item} />} />
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
  }
});
