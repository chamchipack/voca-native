import * as React from 'react';
import {StyleSheet, View, Button, FlatList, Pressable} from 'react-native';
import Word from './Word';

import {useQuery} from '@apollo/client';
import {
  GET_WORD_LIST_AND_TYPE,
  GET_WORD_LIST_TOTAL_COUNT,
} from '../../../graphql/query/query';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {categoryState} from '../../../recoil/state/category';
import {useRecoilValue} from 'recoil';

const fields = [
  '_id',
  'ko',
  'jp',
  'ro',
  'etc {form endingjp endingro stemjp stemro exception}',
];

const offsetCalculate = (cur: number, per: number) => {
  if (!cur) {
    return 0;
  }

  return cur * per;
};

export default function WordContainer({type = ''}) {
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 항목 수

  const category = useRecoilValue(categoryState);

  const query = GET_WORD_LIST_AND_TYPE(fields);

  const {
    loading,
    error,
    data: test,
  } = useQuery(query, {
    variables: {
      input: {type: category === 'all' ? '' : category},
      offset: offsetCalculate(currentPage - 1, itemsPerPage),
      limit: itemsPerPage,
    },
  });

  const {data: totalCountData} = useQuery(GET_WORD_LIST_TOTAL_COUNT, {
    variables: {
      input: {type: category === 'all' ? '' : category},
    },
  });

  const total = totalCountData?.getWordListTotalcount;

  const totalPages = Math.ceil(total / itemsPerPage); // 총 페이지 수

  const currentSet = test?.getWordListAndType || [];

  // 페이지네이션 버튼 계산
  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  return (
    <View style={styles.container}>
      {/* 데이터 리스트 */}
      <FlatList
        data={currentSet}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={{marginTop: 0, marginBottom: 10}}>
            <Word word={item.jp} />
            <View style={styles.divider} />
          </View>
        )}
      />

      {/* 페이지네이션 버튼 */}
      <View style={styles.pagination}>
        {/* 이전 페이지 버튼 */}
        <Pressable
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          <MaterialIcons
            name="arrow-back-ios-new"
            size={20}
            color={currentPage === 1 ? '#a6a6a6' : 'white'}
          />
        </Pressable>

        {/* 페이지 번호 버튼 */}
        {getPaginationRange().map(page => (
          <Button
            key={page}
            title={page.toString()}
            onPress={() => setCurrentPage(page)}
            color={page === currentPage ? 'blue' : 'gray'} // 현재 페이지 강조
          />
        ))}

        {/* 다음 페이지 버튼 */}
        <Pressable
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          <MaterialIcons
            name="arrow-forward-ios"
            size={20}
            color={currentPage === totalPages ? '#a6a6a6' : 'white'}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  divider: {
    borderWidth: 1,
    borderBottomColor: '#545454',
    marginTop: 10,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
});
