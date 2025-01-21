import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ModalCommon from '../common/ModalCommon';

interface Props {
  onPress: () => void;
}
const LogoutButton = ({onPress}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    onPress();
    setModalVisible(false);
  };

  return (
    <View style={{marginVertical: 10}}>
      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}>
        <Text style={styles.text}>로그아웃</Text>
      </TouchableOpacity>

      {/* 공통 모달 */}
      <ModalCommon visible={modalVisible} setVisible={setModalVisible}>
        <Text style={styles.modalText}>정말 로그아웃 하시겠습니까?</Text>
        <View style={styles.modalButtons}>
          <Pressable
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.cancelText}>취소</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton, styles.confirmButton]}
            onPress={handleLogout}>
            <Text style={styles.confirmText}>로그아웃</Text>
          </Pressable>
        </View>
      </ModalCommon>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#171717',
    borderColor: '#a6a6a6',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#a6a6a6',
  },
  confirmButton: {
    backgroundColor: '#171717',
  },
  cancelText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
