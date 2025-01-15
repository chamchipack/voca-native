import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const navItems = [
  {name: '홈', icon: 'home', route: 'Home'},
  {name: 'Search', icon: 'search', route: 'Search'},
  {name: 'Notifications', icon: 'notifications', route: 'Notifications'},
  {name: '마이', icon: 'person', route: 'Profile'},
];

const exception = [
  'StoreDetail',
  'ProductDetail',
  'Payment',
  'Map',
  'PaymentModule',
];

const Navbar = () => {
  const navigation = useNavigation();
  const [currentRouteName, setCurrentRouteName] = useState(
    navigation.getCurrentRoute()?.name,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const route = navigation.getCurrentRoute();
      if (route && route.name !== currentRouteName) {
        setCurrentRouteName(route.name);
      }
    });

    // 컴포넌트 언마운트 시 리스너 제거
    return unsubscribe;
  }, [navigation, currentRouteName]);

  if (exception.includes(currentRouteName)) {
    return <></>;
  }

  return (
    <View style={styles.nav}>
      {navItems.map(item => {
        const isActive = currentRouteName === item.route;
        return (
          <TouchableOpacity
            key={item.route}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.7}>
            <MaterialIcons
              name={item.icon}
              size={24}
              color={isActive ? '#ffffff' : '#333'}
            />
            <Text
              style={[styles.navText, {color: isActive ? '#ffffff' : '#333'}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#6e6e6e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black', // 배경색 설정
    elevation: 5, // Android 그림자
  },
  navItem: {
    alignItems: 'center',
    width: '25%',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 4, // 아이콘과 텍스트 간 간격
  },
});

export default Navbar;
