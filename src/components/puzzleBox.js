import React, {useState, useEffect} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {secondaryColor} from '../assets';
import {colors} from '../utils';

const PuzzleBox = (props) => {
  const {number, allletter} = props;
  // array contain array of letter
  const [array, setArray] = useState(Array.from(allletter));
  // when allletter is changed update the value of array
  // simultaneouly
  useEffect(() => {
    setArray(allletter);
  }, [allletter]);
  // get styles
  const styles = _styles(props);

  return (
    <View style={styles.boxContainer}>
      <SafeAreaView>
        <FlatList
          key={number}
          extraData={array.id}
          numColumns={number}
          data={array}
          renderItem={({item}) => <Item {...props}>{item}</Item>}
        />
      </SafeAreaView>
    </View>
  );
};

const Item = (props) => {
  const {children} = props;
  const styles = _styles(props);
  return (
    <View style={styles.itemGrid}>
      <Text style={styles.txtSize}>{children.toUpperCase()}</Text>
    </View>
  );
};

const _styles = ({number}) => {
  return ScaledSheet.create({
    boxContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '260@s',
    },
    itemGrid: {
      borderWidth: '1@s',
      borderColor: colors.secondaryColor,
      height: `${90 * (3 / number)}@ms`,
      width: `${90 * (3 / number)}@ms`,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtSize: {
      fontSize: '30@ms',
      fontWeight: 'bold',
      color: '#3A3A3A',
    },
  });
};

export default PuzzleBox;
