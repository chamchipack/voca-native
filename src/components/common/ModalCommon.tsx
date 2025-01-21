import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface ModalCommonProps {
  visible: boolean; // 모달 표시 여부
  setVisible: (visible: boolean) => void; // 모달 상태 변경 함수
  children: React.ReactNode; // 모달 내부에 표시할 콘텐츠
}

const ModalCommon: React.FC<ModalCommonProps> = ({
  visible,
  setVisible,
  children,
}) => {
  const handleClose = () => setVisible(false);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose} // Android 뒤로가기 대응
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#383838',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default ModalCommon;
