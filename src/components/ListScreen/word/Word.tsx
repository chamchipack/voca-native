import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  data: {ko: string; jp: string; kana: string};
  wordId: string;
}
export default function Word({data, wordId = ''}: Props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('WordDetail', {_id: wordId})}>
      <View style={{minWidth: '15%'}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
          {data.jp}
        </Text>
      </View>
      <View style={{width: '85%', marginLeft: 10}}>
        <Text style={{color: 'white'}}>{data.kana}</Text>
        <Text style={{color: 'white'}}>{data.ko}</Text>
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
