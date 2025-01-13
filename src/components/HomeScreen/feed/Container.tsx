import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Title from '../title/Title';
import Categories from './Categories';

export default function Containerß() {
  return (
    <View style={styles.container}>
      <Title />

      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxHeight: 180,
  },
});
