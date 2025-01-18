import * as React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Word from './Word';
import {useQuery} from '@apollo/client';
import {
  GET_WORD_LIST_AND_TYPE,
  GET_WORD_LIST_TOTAL_COUNT,
} from '../../../graphql/query/query';
import {categoryState} from '../../../recoil/state/category';
import {useRecoilValue} from 'recoil';
import WordSkeleton from './WordSkeleton';
import {useState} from 'react';
import Pagination from './Pagination';

const fields = [
  '_id',
  'ko',
  'jp',
  'ro',
  'kana',
  // 'etc {form endingjp endingro stemjp stemro exception}',
];

const offsetCalculate = (cur: number, per: number) => {
  if (!cur) {
    return 0;
  }
  return cur * per;
};

export default function WordContainer() {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [cachedData, setCachedData] = useState<any>([]); // 캐시된 데이터
  const itemsPerPage = 10; // 페이지당 항목 수

  const category = useRecoilValue(categoryState);

  const query = GET_WORD_LIST_AND_TYPE(fields);

  const {data, networkStatus, error} = useQuery(query, {
    variables: {
      input: {type: category === 'all' ? '' : category},
      offset: offsetCalculate(currentPage - 1, itemsPerPage),
      limit: itemsPerPage,
    },
    fetchPolicy: 'cache-and-network', // 캐시 유지 및 네트워크 요청 동시 수행
    notifyOnNetworkStatusChange: true, // 네트워크 상태 변화를 감지
  });
  console.log(error);

  const {data: totalCountData} = useQuery(GET_WORD_LIST_TOTAL_COUNT, {
    variables: {
      input: {type: category === 'all' ? '' : category},
    },
  });

  const total = totalCountData?.getWordListTotalcount;
  const totalPages = Math.ceil(total / itemsPerPage); // 총 페이지 수

  React.useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // 데이터가 변경되었을 때 캐시 업데이트
  React.useEffect(() => {
    if (data?.getWordListAndType) {
      setCachedData(data.getWordListAndType);
    }
  }, [data]);

  // 페이지네이션 버튼 계산
  const getPaginationRange = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  const isRefetching = networkStatus === 4; // 데이터 재요청 중인지 확인

  return (
    <View style={styles.container}>
      {/* 데이터 리스트 */}
      <FlatList
        data={cachedData}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={{marginTop: 0, marginBottom: 10}}>
            <Word data={item} wordId={item._id} />
            <View style={styles.divider} />
          </View>
        )}
      />

      {/* 데이터 로드 중 표시 */}
      {isRefetching && <WordSkeleton />}

      {/* 페이지네이션 버튼 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        getPaginationRange={getPaginationRange}
      />
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
