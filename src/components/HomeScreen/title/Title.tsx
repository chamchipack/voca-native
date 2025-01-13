import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>일본어 블로그</Text>
      <Text style={styles.subTitle}>전체보기</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
