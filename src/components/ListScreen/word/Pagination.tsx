import * as React from 'react';
import {Button, Pressable, StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Pagination Component
export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
  getPaginationRange,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  getPaginationRange: () => number[];
}) {
  return (
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
          color={page === currentPage ? 'white' : 'gray'} // 현재 페이지 강조
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
