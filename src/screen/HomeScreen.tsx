import * as React from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Categories from '../components/HomeScreen/Categories';
import Container from '../components/HomeScreen/feed/Container';
import Banner from '../components/HomeScreen/banner/Banner';
import HeaderContainer from '../components/header/HeaderContainer';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}>
      <HeaderContainer />
      <View style={styles.container}>
        <Categories />
        <Container />
        <Banner />
      </View>
    </ScrollView>
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
