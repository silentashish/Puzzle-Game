import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {PuzzleBox, TextInput, Button} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {levelOne, levelTwo, levelThree} from '../../data';

const LevelOneActivity = () => {
  //   level is current game level running and problemIndex is current problem position
  const [level, setLevel] = useState(1);
  const [problemIndex, setProblemIndex] = useState(0);
  // state load all the problem of certain level 1 2 or 3
  const [state, setState] = useState(levelOne);
  // problemNow contain data of current problem
  const [problemNow, setProblemNow] = useState(levelOne[0]);
  // input value contain value enter by the user
  const [input, setInput] = useState();
  // time is use to track of time for user
  const [time, setTime] = useState(5);
  // life is use to calculate how many life is left
  const [life, setLife] = useState(2);
  //   event tracker to check time
  useEffect(() => {
    if (time === 0) {
      // do action
      setProblemIndex((problemIndex) => problemIndex + 1);
      setTime(5);
    }
  }, [time]);

  useEffect(() => {
    if (problemIndex === 5) {
      setLevel((level) => level + 1);
      setProblemIndex(0);
    } else {
      setProblemNow(state[problemIndex]);
    }
  }, [problemIndex]);

  useEffect(() => {
    setState(level === 1 ? levelOne : level === 2 ? levelTwo : levelThree);
  }, [level]);

  // event tracker for life
  useEffect(() => {
    if (life === 5) {
      // do action
    }
  }, [life]);
  //   decrease time continuaously
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView>
      <Text style={{textAlign: 'center', fontSize: 30, margin: 10}}>
        Level {level}
      </Text>

      <Text style={{textAlign: 'center', fontSize: 20, marginBottom: 8}}>
        {problemIndex + 1} / 5
      </Text>

      <PuzzleBox {...problemNow} />

      <Text
        style={{
          marginBottom: 5,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Life
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 5,
        }}>
        <IconNew name="heart" />
        <IconNew name="heart" />
      </View>

      <Text
        style={{
          marginBottom: 5,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Time
      </Text>

      <Text style={{textAlign: 'center', fontSize: 25, marginBottom: 5}}>
        {time}s
      </Text>

      <TextInput />

      <Button />
    </ScrollView>
  );
};

const IconNew = ({name}) => (
  <Icon style={{margin: 5}} name={name} size={20} color={'red'} />
);

export default LevelOneActivity;
