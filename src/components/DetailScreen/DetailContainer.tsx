import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GET_ONE_WORD_FROM_ID} from '../../graphql/query/query';
import {useQuery} from '@apollo/client';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  wordId: string;
}

const fields = [
  '_id',
  'ko',
  'jp',
  'ro',
  'kana',
  'desc',
  'etc {form endingjp endingro stemjp stemro exception}',
  'example { ko jp }',
];

export default function DetailContainer({wordId = ''}: Props) {
  const query = GET_ONE_WORD_FROM_ID(fields);

  const {data, networkStatus} = useQuery(query, {
    variables: {
      input: wordId,
    },
    fetchPolicy: 'cache-and-network', // 캐시 유지 및 네트워크 요청 동시 수행
    notifyOnNetworkStatusChange: true, // 네트워크 상태 변화를 감지
  });

  const item = data?.getOneWordFromId;

  if (!item) return null;

  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.text, marginRight: 10}}>{item.kana}</Text>
          <Text style={{...styles.text, color: '#a6a6a6'}}>{item.ro}</Text>
        </View>
        <View
          style={{
            marginBlock: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{...styles.text, fontSize: 40, fontWeight: 'bold'}}>
            {item.jp}
          </Text>
        </View>
        <Text style={{...styles.text, fontSize: 18}}>{item.ko}</Text>

        <View style={{marginBlock: 10}}>
          <TouchableOpacity style={styles.chip}>
            <MaterialIcons name={'archive'} size={14} color={'#ffffff'} />
            <Text style={styles.chipText}>단어장 추가</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{borderWidth: 0.4, borderColor: 'gray', marginBlock: 10}}
        />
      </View>

      {item.desc && (
        <View style={{marginBlock: 10}}>
          <Text style={{color: '#a6a6a6'}}>참고</Text>
          <View style={{marginBlock: 4}} />
          <Text style={{...styles.text}}>{item.desc}</Text>
          {/* <View
            style={{borderWidth: 0.4, borderColor: 'gray', marginTop: 20}}
          /> */}
        </View>
      )}

      {Array.isArray(item.example) && item.example.length && (
        <View style={{marginBlock: 10}}>
          <View
            style={{borderWidth: 0.4, borderColor: 'gray', marginBlock: 15}}
          />

          <Text style={{color: '#a6a6a6'}}>예문</Text>

          {item.example.map(({ko = '', jp = "'"}) => (
            <View style={{marginBlock: 10}}>
              <Text style={{...styles.text, fontSize: 24, marginBottom: 6}}>
                {jp}
              </Text>
              <Text style={{color: '#a6a6a6'}}>{ko}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {color: 'white'},
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  chipText: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 8,
  },
});
