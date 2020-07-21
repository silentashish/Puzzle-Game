import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {secondaryColor, whiteColor} from '../assets';

export default (props) => {
  const {onPress} = props;
  const styles = _styles();
  return (
    <TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={styles.txt}>Check</Text>
    </TouchableHighlight>
  );
};

const _styles = () => {
  return ScaledSheet.create({
    button: {
      backgroundColor: secondaryColor,
      height: '40@vs',
      marginRight: '23@ms',
      marginLeft: '24@ms',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10@vs',
      borderRadius: '4@ms',
    },
    txt: {
      color: whiteColor,
      fontWeight: 'bold',
      fontSize: '20@ms',
    },
  });
};
