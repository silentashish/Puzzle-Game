import React from 'react';
import {TextInput} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export default (props) => {
  const styles = _styles(props);
  return (
    <TextInput style={styles.Container} placeholder="Enter Guess" {...props} />
  );
};

const _styles = () => {
  return ScaledSheet.create({
    Container: {
      borderWidth: '2@ms',
      borderColor: 'blue',
      marginRight: '23@ms',
      marginLeft: '24@ms',
      padding: '10@ms',
      borderRadius: '4@ms',
      textAlign: 'center',
    },
  });
};