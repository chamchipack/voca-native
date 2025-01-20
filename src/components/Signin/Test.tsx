import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';
import {useMutation} from '@apollo/client';
import {KAKAO_LOGIN_MUTATION} from '../../graphql/mutation/mutation';

const Test = () => {
  const [result, setResult] = useState<string>('');
  const [kakaoLogin] = useMutation(KAKAO_LOGIN_MUTATION([]));

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      // 로그인 시 리프레시는 서버로
      // console.log('login success ', token);
      // 액세스는 키체인으로 보내기.
      setResult(JSON.stringify(token));

      const profile = await getKakaoProfile();

      const form = {
        provider: 'kakao',
        social_id: profile.id.toString(),
        name: profile.nickname,
        profile_image: profile.profileImageUrl,
        refresh_token: token.refreshToken,
        refresh_expires_at: token.refreshTokenExpiresAt,
      };
      console.log(form);

      const data = await kakaoLogin({
        variables: {
          input: form,
        },
      });
      console.log(data);
    } catch (err) {
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();
      console.log(message);

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getProfile = async (): Promise<void> => {
    try {
      const token = JSON.parse(result);
      console.log(token);
      const profile = await getKakaoProfile();
      // 로그인 했으면 자동
      // nickname profileImageUrl thumbnailImageUrl id 도 액세스
      console.log(profile);

      // setResult(JSON.stringify(profile));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const getShippingAddresses = async (): Promise<void> => {
    try {
      const shippingAddresses = await getKakaoShippingAddresses();

      setResult(JSON.stringify(shippingAddresses));
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const unlinkKakao = async (): Promise<void> => {
    try {
      const message = await unlink();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <View>
      <View style={styles.resultContainer}>
        <Text style={{color: 'white'}}>{result}</Text>
        <View style={{height: 100}} />
      </View>
      <Pressable
        style={styles.button}
        onPress={() => {
          signInWithKakao();
        }}>
        <Text style={styles.text}>카카오 로그인</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getProfile()}>
        <Text style={styles.text}>프로필 조회</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => getShippingAddresses()}>
        <Text style={styles.text}>배송주소록 조회</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => unlinkKakao()}>
        <Text style={styles.text}>링크 해제</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => signOutWithKakao()}>
        <Text style={styles.text}>카카오 로그아웃</Text>
      </Pressable>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  resultContainer: {
    flexDirection: 'column',
    width: '100%',
    padding: 24,
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});
