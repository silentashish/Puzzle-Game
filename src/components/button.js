import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export default (props) => {
  const {onPress} = props;
  const styles = _styles();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.txt}>Check</Text>
    </TouchableOpacity>
  );
};

const _styles = () => {
  return ScaledSheet.create({
    button: {
      backgroundColor: 'blue',
      height: '40@vs',
      marginRight: '23@ms',
      marginLeft: '24@ms',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10@vs',
      borderRadius: '4@ms',
    },
    txt: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '20@ms',
    },
  });
};
