import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRecoilState} from 'recoil';
import {inputState} from '../../recoil/state/input';

// const inputColor = '#964F66';
interface Props {
  pageName?: string;
}
export default function Input({pageName = ''}: Props) {
  const navigation = useNavigation();

  const [text, setText] = useState('');
  const [, setInputText] = useRecoilState(inputState);

  const onPressSearch = async () => {
    setInputText(text);
    if (!pageName) navigation.navigate('WordList');
  };

  const onChangeText = (data: string) => {
    setText(data);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="여기에 입력하세요"
        value={text}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.iconContainer} onPress={onPressSearch}>
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
