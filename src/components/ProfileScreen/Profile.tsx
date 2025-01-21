import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRecoilState} from 'recoil';
import {authState} from '../../recoil/state/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import LogoutButton from './LogoutButton';
import WordbookCard from './Wordbook';

type Session = {
  userId: string;
  socialId: string;
  name: string;
  provider: string;
};

export default function Profile() {
  const navigation = useNavigation();
  const [session, setSession] = useState<Session>({
    userId: '',
    socialId: '',
    name: '',
    provider: '',
  });

  const getCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log('Credentials successfully loaded:', credentials);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.error('Could not load credentials', error);
    }
  };

  const getStorage = async () => {
    try {
      const data = await AsyncStorage.getItem('userInfo');

      if (!data) return;

      const info: Session = JSON.parse(data);
      setSession(info);
    } catch (error) {}
  };

  const [auth] = useRecoilState(authState);

  const good = async () => {
    getCredentials();
    getStorage();
    // const s = await AsyncStorage.clear();
  };

  const onPressLogout = async () => {
    try {
      setSession({userId: '', socialId: '', name: '', provider: ''});
      await AsyncStorage.setItem('userInfo', '');
    } catch (e) {}
  };
  useEffect(() => {
    good();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Voca</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileImage} />
        <View style={styles.profileDetails}>
          {session.userId ? (
            <>
              <Text style={styles.nameText}>{session?.name}</Text>
              <Text style={styles.infoText}>정보</Text>
            </>
          ) : (
            <>
              <Text style={styles.nameText}>로그인이 필요합니다</Text>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('Signin')}>
                <MaterialIcons name="arrow-forward" size={12} color="#fff" />
                <Text style={styles.loginButtonText}>로그인</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      <WordbookCard userId={session?.userId || ''} />

      {session.userId ? <LogoutButton onPress={onPressLogout} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    color: '#a6a6a6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  profileImage: {
    backgroundColor: '#a6a6a6',
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  profileDetails: {
    marginLeft: 20,
    justifyContent: 'space-around',
  },
  nameText: {
    color: '#a6a6a6',
    fontSize: 18,
  },
  infoText: {
    color: '#a6a6a6',
    marginTop: 10,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 6,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 8,
  },
  wordbookContainer: {
    marginTop: 40,
  },
  wordbookTitle: {
    color: 'white',
    fontSize: 16,
  },
  wordbookCard: {
    borderWidth: 1,
    borderColor: '#a6a6a6',
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
  },
  wordbookContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordbookText: {
    color: '#a6a6a6',
    marginLeft: 10,
    fontSize: 14,
  },
});
