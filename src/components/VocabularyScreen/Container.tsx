import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Banner from './Banner';
import VocaList from './VocaList';
import {useQuery} from '@apollo/client';
import {GET_VOCA_LIST} from '../../graphql/query/query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Container() {
  const [userId, setUserId] = useState<string | null>(null);

  // 사용자 ID를 가져오는 비동기 함수
  const getUserId = async () => {
    try {
      const info = await AsyncStorage.getItem('userInfo');
      if (info) {
        const {userId = ''} = JSON.parse(info);
        setUserId(userId);
      } else {
        setUserId(null);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 사용자 ID를 가져옴
  useEffect(() => {
    getUserId();
  }, []);

  const query = GET_VOCA_LIST([]);

  const {data, networkStatus, loading, error} = useQuery(query, {
    variables: {
      input: {language: 'japanese', userId: userId || ''}, // userId가 준비된 경우에만 실행
    },
    skip: userId === null, // userId가 없으면 쿼리 실행하지 않음
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>나의 단어장</Text>
      </View>

      <Banner />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <VocaList data={data?.getVocaList} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#a6a6a6',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
