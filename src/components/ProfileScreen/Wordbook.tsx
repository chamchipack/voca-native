import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface WordbookCardProps {
  userId: string;
}

const WordbookCard: React.FC<WordbookCardProps> = ({userId}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 단어장</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Vocabulary')}>
        <View style={styles.content}>
          {userId ? (
            <>
              <MaterialIcons name="arrow-forward" size={18} color="#fff" />
              <Text style={styles.text}>단어장 확인하러 가기</Text>
            </>
          ) : (
            <Text style={styles.text}>로그인이 필요합니다</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#a6a6a6',
    marginLeft: 10,
    fontSize: 14,
  },
});

export default WordbookCard;
