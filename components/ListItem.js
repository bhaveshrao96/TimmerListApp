import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
} from 'react-native';
import {Colors} from '../assets/colors/colors';

// let time = 60;
const ListItem = props => {
  const [hours, setHours] = useState('00');
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('01');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(59);
  const [secondsInputValue, setSecondsInputValue] = useState('60');
  useEffect(() => {
    // timeFormater(secondsInputValue);

    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        var hrs = Math.floor(counter / 3600);
        var mins = Math.floor((counter % 3600) / 60);
        var secs = Math.floor(counter % 60);

        const secondsNewValue = String(secs).length === 1 ? `0${secs}` : secs;
        const minutesNewValue = String(mins).length === 1 ? `0${mins}` : mins;
        const hoursNewValue = String(hrs).length === 1 ? `0${hrs}` : hrs;

        setHours(hoursNewValue);
        setMinute(minutesNewValue);
        setSecond(secondsNewValue);
        setCounter(counter => counter - 1);
      }, 1000);
    }

    if (counter == -1) {
      clearInterval(intervalId);
      setIsActive(false);
      setCounter(secondsInputValue);
      timeFormater(secondsInputValue);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  timeFormater = duration => {
    setSecondsInputValue(duration);
    setCounter(duration);

    var hrs = Math.floor(duration / 3600);
    var mins = Math.floor((duration % 3600) / 60);
    var secs = Math.floor(duration % 60);

    const secondsNewValue = String(secs).length === 1 ? `0${secs}` : secs;
    const minutesNewValue = String(mins).length === 1 ? `0${mins}` : mins;
    const hoursNewValue = String(hrs).length === 1 ? `0${hrs}` : hrs;

    setHours(hoursNewValue);
    setMinute(minutesNewValue);
    setSecond(secondsNewValue);
  };
  return (
    <View style={styles.timmerItemWrapper}>
      <View style={styles.timerWrapper}>
        <TextInput
          maxLength={4}
          defaultValue={secondsInputValue}
          keyboardType={'number-pad'}
          style={styles.textInputStyle}
          onChangeText={text => timeFormater(text)}
        />
      </View>
      <View style={styles.timmerBox}>
        <Text style={styles.timmerValue}>{hours}:</Text>
        <Text style={styles.timmerValue}>{minute}:</Text>
        <Text style={styles.timmerValue}>{second}</Text>
      </View>

      <TouchableOpacity
        style={styles.timerButton}
        onPress={() => {
          setIsActive(!isActive);
        }}>
        {isActive ? (
          <Image
            source={require('../assets/Images/pause.png')}
            style={{height: 20, width: 20}}
          />
        ) : (
          <Image
            source={require('../assets/Images/play.png')}
            style={{height: 20, width: 20}}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timmerItemWrapper: {
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    padding: 0,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryColor,
  },
  timerText: {},
  timerWrapper: {
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    width: 80,
    alignItems: 'center',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerButton: {
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.buttonColor,
  },
  buttonText: {
    color: '#efefef',
    fontSize: 16,
  },
  timmerBox: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondaryColor,
  },
  timmerValue: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primaryColor,
  },
});

export default ListItem;
