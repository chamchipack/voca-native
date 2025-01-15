import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, StyleSheet} from 'react-native';
import StackNavigator from './StackNavigator';
import Navbar from './Navbar';

function MainNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StackNavigator />
        <Navbar />
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
