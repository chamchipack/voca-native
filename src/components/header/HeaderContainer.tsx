import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import Input from './Input';
import Logo from './Logo';

export default function HeaderContainer() {
  return (
    <View style={styles.container}>
      <Logo />
      <Input />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 50,
    padding: 20,
    backgroundColor: 'black',
  },
});
