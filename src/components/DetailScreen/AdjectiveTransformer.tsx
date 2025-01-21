import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // CloseIcon 대체
import {adjLogic} from '../../config/transformLogic/adjective';
import {hiragana} from '../../config/default';
import {Adj, Word} from '../../config/defaultType';

const AdjectiveTransformer = ({...props}) => {
  const [data, setData] = useState<Word<Adj>>(props?.data);
  const [formSelection, setFormSelection] = useState('');
  const [formArray, setFormArray] = useState([]);
  const [detailSelection, setDetailSelection] = useState<any[]>([]); // 다중 선택을 위한 배열

  const handleChipClick = (tense: string) => {
    if (tense === formSelection) {
      setDetailSelection([]);
      setFormArray([]);
      setFormSelection('');
      return;
    }

    setDetailSelection([]);
    setFormSelection(tense);
    const {value = []} = adjLogic.find(({key = ''}) => key === tense) || {};
    setFormArray(value);
  };

  const handleDetailClick = (name: string, value: any) => {
    setDetailSelection(prev => {
      const exists = prev.some(item => item.name === name);

      if (exists) {
        return prev.filter(item => item.name !== name);
      } else {
        return [...prev, {name, value}];
      }
    });
  };

  const onConvertRow = (name: string, value: any) => {
    try {
      const {ko = '', etc: {stemjp = '', exception = false, form = ''} = {}} =
        data;

      const good = value[form];
      const romaji = good.split('_');

      let result = '';
      romaji.forEach((o: string) => {
        let foundation = false;
        Object.values(hiragana).forEach(data => {
          const {jp = ''} = data.find(({ro: _ro}) => _ro === o) || {};
          if (jp) result += jp;
          else foundation = true;
        });
        if (o && o.includes('$') && foundation) result += o.substring(1);
      });

      return (
        <View style={styles.convertedRow}>
          <Text style={styles.convertedRowLabel}>{`${ko} + ${name}`}</Text>
          <Text style={styles.convertedRowContent}>
            {stemjp}
            <Text style={styles.convertedRowHighlight}>{result}</Text>
          </Text>
        </View>
      );
    } catch {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>변화형</Text>

      {/* Form Selection */}
      <View style={styles.chipContainer}>
        {adjLogic.map(({name = '', key = ''}) => (
          <TouchableOpacity
            key={`${name}_${key}_${Math.random()}`} // 고유한 key 생성
            onPress={() => handleChipClick(key)}
            style={[styles.chip, formSelection === key && styles.selectedChip]}>
            <Text
              style={[
                styles.chipText,
                formSelection === key && styles.selectedChipText,
              ]}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
        {formSelection && (
          <TouchableOpacity
            onPress={() => {
              setFormSelection('');
              setDetailSelection([]);
              setFormArray([]);
            }}>
            <Icon name="close" size={16} />
          </TouchableOpacity>
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Detail Selection */}
      <View style={styles.chipContainer}>
        {formArray.map(({name = '', key = '', value}, index) => (
          <TouchableOpacity
            key={`${name}_${key}_${index}`}
            onPress={() => handleDetailClick(name, value)}
            style={[
              styles.chip,
              detailSelection.map(({name}) => name).includes(name) &&
                styles.selectedChip,
            ]}>
            <Text
              style={[
                styles.chipText,
                detailSelection.map(({name}) => name).includes(name) &&
                  styles.selectedChipText,
              ]}>
              {name}
            </Text>
          </TouchableOpacity>
        ))}
        {formArray.length ? (
          <TouchableOpacity
            onPress={() => {
              setDetailSelection([]);
            }}>
            <Icon name="close" size={16} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Converted Rows */}
      <View>
        {detailSelection.map((item, index) =>
          onConvertRow(item?.name, item?.value),
        )}
      </View>
    </View>
  );
};

export default AdjectiveTransformer;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: '#6200ee',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  selectedChipText: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  convertedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#171717',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  convertedRowLabel: {
    fontSize: 14,
    color: '#a6a6a6',
    marginRight: 8,
  },
  convertedRowContent: {
    fontSize: 16,
    color: '#fff',
  },
  convertedRowHighlight: {
    color: '#e53935',
  },
});
