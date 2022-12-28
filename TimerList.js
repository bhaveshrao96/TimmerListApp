import React, {Component, useState} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Colors} from './assets/colors/colors';
import ListItem from './components/ListItem';

export default function TimmerList() {
  const [allItems, setNewItem] = useState([{id: '0', name: 'Timmer'}]);

  handleAddTimmer = () => {
    const id = allItems.length + 1;
    setNewItem(prev => [
      ...prev,
      {
        id: id,
        task: 'Timmer',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listWrapper}>
        <Text style={styles.title}>Timmmer List</Text>

        <FlatList
          data={allItems}
          renderItem={({item}) => <ListItem key={item.id} name={item} />}
          keyExtractor={item => item.id}
          style={styles.flatlistStyle}
        />
      </View>
      <TouchableOpacity
        style={styles.addButtonWrapper}
        onPress={() => handleAddTimmer()}>
        <Image
          source={require('./assets/Images/addIcon.png')}
          style={{height: 80, width: 80}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'JosefinSans',
    flex: 1,
    padding: 10,
    marginTop: 3,
    backgroundColor: Colors.backgroundColor,
    color: '#181D31',
  },
  text: {
    color: '#4f603c',
  },
  listWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'JosefinSans',
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.primaryColor,
  },
  items: {},
  addButtonWrapper: {
    backgroundColor: Colors.buttonColor,
    width: 80,
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addButtonText: {
    color: '#efefef',
    fontSize: 20,
  },
  flatlistStyle: {
    marginVertical: 50,
  },
});
