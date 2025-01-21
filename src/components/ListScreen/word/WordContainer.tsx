import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import Word from './Word';
import {useQuery} from '@apollo/client';
import {GET_WORD_LIST_OR_TYPE} from '../../../graphql/query/query';
import {categoryState} from '../../../recoil/state/category';
import {useRecoilValue} from 'recoil';
import {inputState} from '../../../recoil/state/input';
import NetworkWrapper from '../../network/NetworkWrapper';

const fields = ['_id', 'ko', 'jp', 'ro', 'kana'];

const offsetCalculate = (cur: number, per: number) => cur * per;

export default function WordContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [cachedData, setCachedData] = useState<any>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const inputText = useRecoilValue(inputState);
  const itemsPerPage = 8;

  const category = useRecoilValue(categoryState);

  const query = GET_WORD_LIST_OR_TYPE(fields);

  const {data, fetchMore, loading} = useQuery(query, {
    variables: {
      input: {
        type: category === 'all' ? '' : category,
        ko: inputText,
        jp: inputText,
        ro: inputText,
        kana: inputText,
      },
      offset: offsetCalculate(0, itemsPerPage),
      limit: itemsPerPage,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setCachedData(data?.getWordListOrType || []);
  }, [data]);

  const handleLoadMore = async () => {
    if (isFetchingMore || cachedData.length % itemsPerPage !== 0) return;

    setIsFetchingMore(true);

    try {
      const newPage = currentPage + 1;

      const {data: newData} = await fetchMore({
        variables: {
          input: {
            type: category === 'all' ? '' : category,
            ko: inputText,
            jp: inputText,
            ro: inputText,
            kana: inputText,
          },
          offset: offsetCalculate(newPage - 1, itemsPerPage),
          limit: itemsPerPage,
        },
      });

      if (newData?.getWordListOrType?.length) {
        setCachedData(prevData => [...prevData, ...newData.getWordListOrType]);
        setCurrentPage(newPage);
      }
    } finally {
      setIsFetchingMore(false);
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return <ActivityIndicator size="large" color="#a6a6a6" />;
  };

  return (
    <NetworkWrapper onRetry={() => setCurrentPage(1)}>
      <View style={styles.container}>
        <FlatList
          data={cachedData}
          keyExtractor={(item, index) => `${item._id}_${index}`}
          renderItem={({item}) => (
            <View style={{marginTop: 0, marginBottom: 10}}>
              <Word data={item} wordId={item._id} />
              <View style={styles.divider} />
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </NetworkWrapper>
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
});
