import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';
import {authState} from '../src/recoil/state/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import * as Keychain from 'react-native-keychain';
import {useMutation} from '@apollo/client';
import {KAKAO_INITIAL_CHECK_MUTATION} from '../src/graphql/mutation/mutation';

export default function Splash({children}: {children: React.ReactNode}) {
  const [, setAuth] = useRecoilState(authState);
  const [kakaoInitialCheck] = useMutation(KAKAO_INITIAL_CHECK_MUTATION([]));

  const saveCredentials = async () => {
    try {
      await Keychain.setGenericPassword('username', 'password');
      console.log('Credentials stored successfully');
    } catch (error) {
      console.error('Could not store credentials', error);
    }
  };

  const resetCredentials = async () => {
    try {
      await Keychain.resetGenericPassword();
      console.log('Credentials successfully deleted');
    } catch (error) {
      console.error('Could not delete credentials', error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // resetCredentials();
        // AsyncStorage에서 id와 pw 가져오기
        const info = await AsyncStorage.getItem('userInfo');

        if (!info) return;

        const userInfo = JSON.parse(info);
        // provider
        if (userInfo.provider === 'local') {
          console.log('local');
        } else {
          const {data} = await kakaoInitialCheck({
            variables: {
              input: {
                social_id: userInfo.socialId,
                provider: userInfo.provider,
              },
            },
          });

          const {status = 404, isAuthenticated = false} =
            data?.kakaoInitialCheck || {};

          if (status === 200 && isAuthenticated) console.log('No Problem');
          else await AsyncStorage.clear();
        }
        //
        const id = await AsyncStorage.getItem('id');
        const pw = await AsyncStorage.getItem('pw');

        if (id && pw) {
          // id와 pw가 존재하면 authState 업데이트
          setAuth({
            isAuthenticated: true,
            user: {id, pw, name: '참치'},
          });
          // console.log('Authentication updated:', {id, pw});
        } else {
          // id 또는 pw가 없으면 초기 상태로 유지
          // console.log('No credentials found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to initialize authentication', error);
      } finally {
        // 1500ms 후 초기화 완료
        setTimeout(() => {
          SplashScreen.hide();
          //   setIsInitialized(true);
        }, 1500);
      }
    };

    initializeApp();
  }, [setAuth]);

  return <>{children}</>;
}
