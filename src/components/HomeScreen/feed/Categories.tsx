import * as React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';

const categories = [
  {id: '1', name: '글 1', image: require('../../../images/krafton.png')},
  {id: '2', name: '글 1', image: require('../../../images/krafton.png')},
  {id: '3', name: '글 1', image: require('../../../images/krafton.png')},
  {id: '4', name: '글 1', image: require('../../../images/krafton.png')},
  {id: '5', name: '글 1', image: require('../../../images/krafton.png')},
];

export default function Categories() {
  const renderItem = ({item}: any) => (
    <View style={styles.itemContainer}>
      <View style={styles.box}>
        <Image source={item.image} style={styles.image} />
      </View>
      <Text style={styles.labelText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.body}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {marginTop: 20},
  container: {
    height: 100,
    // padding: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    // paddingHorizontal: 20,
  },
  itemContainer: {
    // alignItems: 'center',
    marginRight: 15,
  },
  box: {
    width: 160,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  labelText: {
    marginTop: 5,
    color: '#555',
    fontSize: 12,
  },
});
