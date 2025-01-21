import {useMutation} from '@apollo/client';
import {Alert, Image, Pressable, View} from 'react-native';
import {KAKAO_LOGIN_MUTATION} from '../../../graphql/mutation/mutation';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import RNFS from 'react-native-fs';

// const ensureAsyncStorageDirectoryExists = async () => {
//   const asyncStorageDir = `${RNFS.LibraryDirectoryPath}/RCTAsyncLocalStorage_V1`;
//   try {
//     const exists = await RNFS.exists(asyncStorageDir);
//     if (!exists) {
//       await RNFS.mkdir(asyncStorageDir);
//     }
//   } catch (error) {
//     console.error('Failed to ensure AsyncStorage directory:', error);
//   }
// };

export default function KakaoLoginButton() {
  const navigation = useNavigation();

  const [kakaoLogin] = useMutation(KAKAO_LOGIN_MUTATION([]));

  const signInWithKakao = async () => {
    // 소셜로그인 최초 진입점

    try {
      const token = await login();
      const profile = await getKakaoProfile();

      const form = {
        provider: 'kakao',
        social_id: profile.id.toString(),
        name: profile.nickname,
        profile_image: profile.profileImageUrl,
        refresh_token: token.refreshToken,
        refresh_expires_at: token.refreshTokenExpiresAt,
      };

      const {data} = await kakaoLogin({
        variables: {
          input: form,
        },
      });

      const {status = 404, ...rest} = data?.kakaoLogin || {};

      if (status !== 200) return Alert.alert('로그인에 실패했습니다');

      const storage = {
        userId: rest?.data._id,
        name: rest?.data?.name,
        provider: rest?.data?.provider,
        socialId: rest?.data?.social_id,
      };

      //   await Keychain.setGenericPassword('access_token', token.accessToken);
      await AsyncStorage.clear();
      await AsyncStorage.setItem('userInfo', JSON.stringify(storage));

      navigation.replace('Profile');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={signInWithKakao}>
      <Image
        style={{width: '100%', height: 50, marginBlock: 20}}
        source={require('../../../images/kakao_login_large_wide.png')}
      />
    </Pressable>
  );
}
