import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import WordListScreen from '../screen/WordListScreen';
import WordDetailScreen from '../screen/WordDetailScreen';
import ProfileScreen from '../screen/ProfileScreen';
import SigninScreen from '../screen/SigninScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="WordList" component={WordListScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
    </Stack.Navigator>
  );
}
