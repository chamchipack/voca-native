import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={require('../../images/Logo.png')} style={styles.image} />
      {/* <Text style={styles.LogoText}>LOGO</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 20,
    marginBottom: 10,
  },
  LogoText: {
    color: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
