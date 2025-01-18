import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import {authState} from '../../recoil/state/auth';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {START_KAKAO_LOGIN_MUTATION} from '../../graphql/mutation/mutation';
import Test from './Test';

export default function Login() {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [, setAuth] = useRecoilState(authState);

  const signin = async () => {
    if (id === 'chamchipack' && pw === 'bahmcarey09@') {
      try {
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('pw', pw);

        setAuth({
          isAuthenticated: true,
          user: {id, pw, name: '참치'},
        });

        // Alert.alert('로그인 성공', '환영합니다!');
        navigation.reset({
          index: 0,
          routes: [{name: 'Profile'}],
        });
      } catch (error) {
        console.error('Failed to save credentials:', error);
        Alert.alert('오류', '로그인 상태를 저장하지 못했습니다.');
      }
    } else {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const [startKakaoLogin] = useMutation(START_KAKAO_LOGIN_MUTATION([]));

  const onPressKakao = async () => {
    // 소셜로그인 최초 진입점

    try {
      const {data} = await startKakaoLogin();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="아이디"
        placeholderTextColor="#ccc"
        style={styles.input}
        value={id}
        onChangeText={setId}
      />
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#ccc"
        style={styles.input}
        secureTextEntry
        value={pw}
        onChangeText={setPw}
      />
      <TouchableOpacity style={styles.loginButton} onPress={signin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <Pressable onPress={onPressKakao}>
        <Image
          style={{width: '100%', height: 50, marginBlock: 20}}
          source={require('../../images/kakao_login.png')}
        />
      </Pressable>

      <Test />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    // justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#222',
  },
  loginButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
