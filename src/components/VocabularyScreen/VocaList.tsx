import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const list = ['이런 단어장', '저런 단어장'];
export default function VocaList({...props}) {
  const [rows, setRows] = useState(props?.data);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>단어장 리스트</Text>

      <View>
        {rows.map(({_id = '', name = ''}) => (
          <View key={_id} style={styles.box}>
            <Text style={styles.word}>{name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#a6a6a6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    height: 70,
    backgroundColor: '#171717',
    marginBlock: 10,
    borderRadius: 10,
    padding: 10,
  },
  word: {
    color: 'white',
  },
});
