import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView} from 'react-native';
import {PuzzleBox, TextInput, Button, AppHeader} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {levelOne, levelTwo, levelThree} from '../../data';
import { styles } from './styles'
import { colors } from '../../utils';
import { showToast } from '../../utils/showAlert';

const TimeLimit = 60;
const TotalLife = 3;

const LevelOneActivity = () => {
  //   level is current game level running and problemIndex is current problem position
  const [level, setLevel] = useState(1);
  const [problemIndex, setProblemIndex] = useState(0);
  // state load all the problem of certain level 1 2 or 3
  const [state, setState] = useState(levelOne);
  // problemNow contain data of current problem
  const [problemNow, setProblemNow] = useState(levelOne[0]);
  // input value contain value enter by the user
  const [input, setInput] = useState('');
  // time is use to track of time for user
  const [time, setTime] = useState(TimeLimit);
  // life is use to calculate how many life is left
  const [life, setLife] = useState(TotalLife);
  // user selected old answer
  const [oldanswer, setOldAnswer] = useState([]);
  //   event tracker to check time
  useEffect(() => {
    if (time === 0) {
      // do action
      setProblemIndex((problemIndex) => problemIndex + 1);
      setTime(TimeLimit);
      showToast('TimeOut, You fail to answer in time.')
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
    if (life === 0) {
      // do action
      showToast('You Failed to answer at this level!')
      setTime(TimeLimit);
      setProblemIndex((problemIndex) => problemIndex + 1);
      setLife(TotalLife);
    }
  }, [life]);
  // decrease time continuaously
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Event to check if number of anser input is complete or not
  useEffect(() => {
    // reset all value when input given
    if (oldanswer.length === 2) {
      setProblemIndex((problemIndex) => problemIndex + 1);
      setLife(3);
      setOldAnswer([]);
      setTime(TimeLimit);
    }
  }, [oldanswer.length]);

  const handleCheck = () => {
    // if user didn't input anything ask to enter answer
    if (!input) {
      showToast('Enter Answer!')
    }
    const caseInput = input.toLowerCase();
    //if answer is already set then inform user
    if (oldanswer.includes(caseInput)) {
      setInput('');
      showToast('Already Added!')
    }
    // if user enter correct answer then remove item from solution and put this on old answer
    if (problemNow.solution.includes(caseInput)) {
      setInput('');
      showToast('Correct Answer!', 'success');
      setProblemNow({
        ...problemNow,
        solution: problemNow.solution.filter((value) => {
          return value !== caseInput;
        }),
      });
      setOldAnswer([...oldanswer, caseInput]);
    } else {
      if (life === 1) {
        setLife((life) => life - 1);
        return;
      }
      showToast(`Wrong Answer, ${life - 1} attempt remain.`)
      setLife((life) => life - 1);
    }
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView backgroundColor={colors.secondaryColor} opacity={0.95}/>
      <AppHeader title="WordBrain" subTitle={`Level ${level}`}/>
      <ScrollView>
        <Text style={styles.problemIndex}>{problemIndex + 1} / 5</Text>

        <PuzzleBox {...problemNow} />
        <Text style={styles.instruction}>Make words from the checkboard above and type in the Text Input. {`\n`}Press check button to check if you're right</Text>

        <View
          style={styles.timeLifeView}>
          <Time time={time} />
          <Life number={life} />
        </View>
        
        <OldAnswer oldanswer={oldanswer} />
        <TextInput onChangeText={(val) => setInput(val)} value={input} />

        <Button onPress={handleCheck} />
      </ScrollView>
    </View>
  );
};

const IconNew = ({name, disable}) => (
  <Icon
    style={{margin: 5}}
    name={name}
    size={20}
    color={disable ? '#a1a1a1' : 'red'}
  />
);

const Time = ({time}) => (
  <View>
    <Text style={styles.timeText}>Time</Text>
    <Text style={styles.timesText}>{time}s</Text>
  </View>
);

const OldAnswer = ({oldanswer}) => (
  <View
    style={styles.oldAnswerView}>
    {oldanswer.length > 0
      ? oldanswer.map((item) => (
          <View
            style={styles.oldAnswerSubView}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))
      : null}
  </View>
);

const Life = ({number}) => (
  <View>
    <Text style={styles.lifeText}>Life</Text>
    <View style={styles.heartView}>
      <IconNew name="heart" disable={number < 1} />
      <IconNew name="heart" disable={number < 2} />
      <IconNew name="heart" disable={number < 3} />
    </View>
  </View>
);

export default LevelOneActivity;
