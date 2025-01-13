import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const inputColor = '#964F66';

export default function Input() {
  const [text, setText] = useState('');

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="여기에 입력하세요"
        value={text}
        onChangeText={setText}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="search" size={20} color={'#9b25f5'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    // iOS 그림자
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android 그림자
    elevation: 3,
  },
  iconContainer: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    paddingLeft: 4,
    // color: inputColor,
  },
});
