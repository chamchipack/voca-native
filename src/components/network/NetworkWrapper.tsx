import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface NetworkWrapperProps {
  children: React.ReactNode; // 네트워크가 연결되었을 때 표시할 콘텐츠
  onRetry?: () => void; // 네트워크 재시도 시 호출할 함수
}

const NetworkWrapper: React.FC<NetworkWrapperProps> = ({children, onRetry}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 네트워크 상태 구독
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, []);

  const handleRetry = () => {
    setLoading(true);
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setLoading(false);

      if (state.isConnected && onRetry) {
        onRetry(); // 네트워크가 연결되었을 때 재시도 콜백 실행
      }
    });
  };

  if (isConnected === null) {
    // 초기 로딩 상태 표시
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  if (!isConnected) {
    // 네트워크가 연결되지 않았을 때 표시
    return (
      <View style={styles.noConnectionContainer}>
        <Text style={styles.noConnectionText}>
          네트워크가 연결되지 않았습니다.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={loading}>
          <MaterialIcons name="refresh" size={24} color="#fff" />
          <Text style={styles.retryText}>
            {loading ? '재시도 중...' : '다시 시도'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 네트워크가 연결되었을 때 children 렌더링
  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConnectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  noConnectionText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default NetworkWrapper;
