import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {categoryState} from '../../recoil/state/category';

const categories = [
  {
    id: 'all',
    name: '전체',
    image: require('../../images/categories/all.png'),
  },
  {
    id: 'verb',
    name: '동사',
    image: require('../../images/categories/verb.png'),
  },
  {
    id: 'adj',
    name: '형용사',
    image: require('../../images/categories/adj.png'),
  },
  {
    id: 'noun',
    name: '명사',
    image: require('../../images/categories/noun.png'),
  },
  {
    id: 'adv',
    name: '부사',
    image: require('../../images/categories/adv.png'),
  },
  {
    id: 'etc',
    name: '기타',
    image: require('../../images/categories/etc.png'),
  },
];

export default function Categories({type = '', isListPage = false}) {
  const navigation = useNavigation();

  const [category, setCategory] = useState(type);
  const [, setCategoryState] = useRecoilState(categoryState);

  const handlePress = (id: string) => {
    setCategory(id);
    setCategoryState(id);
    if (!isListPage) {
      navigation.navigate('WordList', {type: id});
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.itemContainer,
          opacity: item.id !== category && isListPage ? 0.5 : 1,
        }}
        onPress={() => handlePress(item.id)}>
        <View style={styles.box}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.labelText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {marginBottom: 20},
  container: {
    height: 100,
    padding: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  box: {
    width: 70,
    height: 70,
    borderRadius: 35, // 부모 뷰를 완전한 원형으로
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // 이미지가 부모 뷰를 넘지 않도록 처리
    elevation: 3, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 35, // 이미지도 부모 뷰와 동일한 반경
  },
  labelText: {
    marginTop: 5,
    color: '#555',
    fontSize: 12,
  },
});
