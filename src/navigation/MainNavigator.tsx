import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import StackNavigator from './StackNavigator';

function MainNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
export default MainNavigator;
