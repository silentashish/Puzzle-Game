import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {PuzzleBox, TextInput, Button, AppHeader} from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import {levelOne, levelTwo, levelThree} from '../../data';
import {styles} from './styles';
import {colors} from '../../utils';
import {showToast} from '../../utils/showAlert';
import LottieView from 'lottie-react-native';

// time limit of game and total life of game
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
  const [input, setInput] = useState();
  // time is use to track of time for user
  const [time, setTime] = useState(TimeLimit);
  // life is use to calculate how many life is left
  const [life, setLife] = useState(TotalLife);
  // user selected old answer
  const [oldanswer, setOldAnswer] = useState([]);
  // count score to know if user pass this level or not
  const [score, setScore] = useState(0);
  // stop timer when we don't want to run
  const [stopTimer, setStopTimer] = useState(true);
  // successfully completed level
  const [success, setSuccess] = useState(false);
  // fail to complete level
  const [failed, setFailed] = useState(false);
  // if accept to start game
  const [started, setStarted] = useState(false);
  //   event tracker to check time
  useEffect(() => {
    if (time === 1) {
      // do action
      setProblemIndex((problemIndex) => problemIndex + 1);
      setTime(TimeLimit);
      showToast('TimeOut, You fail to answer in time.');
      setOldAnswer([]);
    }
  }, [time]);

  useEffect(() => {
    if (problemIndex === 5) {
      if (score > 6) {
        setScore(0);
        GoToNextLevel();
      } else {
        setFailed(true);
        setStopTimer(true);
        setProblemIndex(0);
      }
    } else {
      setProblemNow(state[problemIndex]);
    }
  }, [problemIndex]);

  const GoToNextLevel = () => {
    setLevel((level) => (level == 3 ? 1 : level + 1));
    setSuccess(true);
    setStopTimer(true);
  };

  useEffect(() => {
    setState(level === 1 ? levelOne : level === 2 ? levelTwo : levelThree);
  }, [level]);

  useEffect(() => {
    setProblemIndex(0);
  }, [state]);

  // event tracker for life
  useEffect(() => {
    if (life === 0) {
      // do action
      showToast('You Failed to answer at this level!');
      setTime(TimeLimit);
      setProblemIndex((problemIndex) => problemIndex + 1);
      setLife(TotalLife);
      setOldAnswer([]);
    }
  }, [life]);
  // decrease time continuaously
  useEffect(() => {
    const interval = setInterval(() => {
      if (!stopTimer) {
        setTime((time) => time - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [stopTimer]);

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
      return showToast('Enter Answer!');
    }
    const caseInput = input.toLowerCase();
    //if answer is already set then inform user
    if (oldanswer.includes(caseInput)) {
      setInput('');
      return showToast('Already Added!');
    }
    // if user enter correct answer then remove item from solution and put this on old answer
    if (problemNow.solution.includes(caseInput)) {
      setScore((score) => score + 1);
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
      setLife((life) => life - 1);
      setInput('');
      if (life === 1) {
        return;
      }
      showToast(`Wrong Answer, ${life - 1} attempt remain.`);
    }
  };

  if (success)
    return (
      <View style={styles.mainView}>
        <View style={styles.centerElement}>
          <Text style={styles.bigText}>
            {level === 1 ? `Game` : `Level ${level - 1}`}
          </Text>
          <Text style={styles.bigText}>Completed</Text>
          <View style={styles.animationBox}>
            <LottieView
              source={require('../../assets/Animations/success.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          <Button
            onPress={() => {
              setSuccess(false);
              setStopTimer(false);
            }}>
            {level === 1 ? 'Try Again' : 'Continue'}
          </Button>
        </View>
      </View>
    );

  if (failed)
    return (
      <View style={styles.mainView}>
        <View style={styles.centerElement}>
          <Text style={styles.bigText}>Level {level - 1}</Text>
          <Text style={styles.bigText}>Failed</Text>
          <View style={styles.animationBox}>
            <LottieView
              source={require('../../assets/Animations/cancel.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          <Button
            onPress={() => {
              setFailed(false);
              setStopTimer(false);
            }}>
            Try Again
          </Button>
        </View>
      </View>
    );

  if (!started)
    return (
      <View style={styles.mainView}>
        <View style={styles.centerElement}>
          <Text style={styles.bigText}>Welcome to Word Brain</Text>
          <Text style={styles.bigText}></Text>
          <View style={styles.animationBox}>
            <LottieView
              source={require('../../assets/Animations/puzzle.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          <Button
            onPress={() => {
              setStarted(true);
              setStopTimer(false);
            }}>
            Start Now
          </Button>
        </View>
      </View>
    );

  return (
    <View style={styles.mainView}>
      <SafeAreaView backgroundColor={colors.secondaryColor} opacity={0.95} />
      <AppHeader title="WordBrain" subTitle={`Level ${level}`} />
      <ScrollView>
        <View style={styles.InfoSection}>
          <View>
            <Text style={styles.timeText}>Puzzle</Text>
            <Text style={styles.problemIndex}>{problemIndex + 1} / 5</Text>
          </View>
          <View>
            <Text style={styles.timeText}>Score</Text>
            <Text style={styles.problemIndex}>{score} / 10</Text>
          </View>
        </View>
        <PuzzleBox {...problemNow} />
        <Text style={styles.instruction}>
          Make words from the checkboard above and type in the Text Input.{' '}
          {`\n`}Press check button to check if you're right
        </Text>

        <View style={styles.timeLifeView}>
          <Time time={time} />
          <Life number={life} />
        </View>

        <TextInput onChangeText={(val) => setInput(val)} value={input} />

        <Button onPress={handleCheck}>Check</Button>
        <View style={styles.divider} />

        <OldAnswer oldanswer={oldanswer} />
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
  <>
    {oldanswer.length > 0 ? (
      <>
        <Text style={styles.timeText}>Correct Answer</Text>
        <View style={styles.oldAnswerView}>
          {oldanswer.map((item) => (
            <View style={styles.oldAnswerSubView}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
      </>
    ) : null}
  </>
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
