import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function Word({word = ''}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('WordDetail')}>
      <View style={{minWidth: '15%'}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
          可哀
        </Text>
      </View>
      <View style={{width: '85%', marginLeft: 10}}>
        <Text style={{color: 'white'}}>{word}</Text>
        <Text style={{color: 'white'}}>명사 사정, 경우, 형편</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10, // TouchableOpacity의 클릭 영역을 확장
  },
});
