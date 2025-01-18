import * as React from 'react';
import {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

export default function WordSkeleton() {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 깜빡이는 애니메이션 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1, // 최대 불투명도
          duration: 500, // 페이드 인 시간
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3, // 최소 불투명도
          duration: 500, // 페이드 아웃 시간
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeleton, {opacity}]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  skeleton: {
    // width: 250,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#e0e0e0', // 회색 배경
    marginVertical: 10,
  },
});
