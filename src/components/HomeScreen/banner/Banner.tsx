import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../images/good.jpg')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
