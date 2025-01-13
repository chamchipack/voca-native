import * as React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Container from '../components/ListScreen/Container';

export default function WordListScreen() {
  return (
    <View
      style={styles.scrollView}
      // contentContainerStyle={styles.contentContainer}>
    >
      <Container />
      {/* <View style={styles.container} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'black', // ScrollView의 배경색
  },
  contentContainer: {
    flexGrow: 1, // 스크롤 가능한 내용이 없더라도 전체 영역 채우기
    backgroundColor: 'black', // ScrollView 내용물의 배경색
  },
  container: {
    flex: 1,
    backgroundColor: 'black', // 내부 View의 배경색
  },
});
