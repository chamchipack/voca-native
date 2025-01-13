import * as React from 'react';
import {StyleSheet, View, Button, FlatList} from 'react-native';
import Word from './Word';

export default function WordContainer({total = 80}) {
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지
  const itemsPerPage = 10; // 페이지당 항목 수
  const totalPages = Math.ceil(total / itemsPerPage); // 총 페이지 수

  // 현재 페이지의 데이터 (예시 데이터를 만듭니다)
  const data = Array.from({length: total}).map((_, index) => ({
    id: index + 1,
    word: `Word ${index + 1}`,
  }));

  // 현재 페이지에 표시할 데이터 추출
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
        data={currentData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{marginTop: 0, marginBottom: 10}}>
            <Word word={item.word} />
            <View style={styles.divider} />
          </View>
        )}
      />

      {/* 페이지네이션 버튼 */}
      <View style={styles.pagination}>
        {/* 이전 페이지 버튼 */}
        <Button
          title="Previous"
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />

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
        <Button
          title="Next"
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
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
