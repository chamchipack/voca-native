import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Categories from '../HomeScreen/Categories';
import Input from '../header/Input';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import WordContainer from './word/WordContainer';

export default function Container() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <TouchableOpacity
          style={{width: 30}}
          onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={20}
            color={'#ffffff'}
          />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Input />
        </View>
      </View>
      <Categories />
      <WordContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxHeight: 180,
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
