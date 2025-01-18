import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Title from '../title/Title';

export default function Banner() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>단어 에디터</Text>
        <Text style={styles.subTitle}>이동</Text>
      </View>
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
  box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBlock: 10,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  subTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
