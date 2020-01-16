import React, {useState, useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';

const Countdown = props => {
  const [countdownIntervalId, setCountdownIntervalId] = useState(null);
  const [countdownTime, setCountdownTime] = useState(props.countdownTime);

  useEffect(() => {
    let methodCountdownTime = countdownTime;
    const intervalId = setInterval(() => {
      methodCountdownTime--;
      setCountdownTime(methodCountdownTime);
      if (!methodCountdownTime) {
        clearInterval(intervalId);
        props.countdownFinished();
      }
    }, 1000);
    setCountdownIntervalId(intervalId);

    return () => {
      clearInterval(countdownIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Text style={styles.countdownText}>{countdownTime}</Text>;
};

export default Countdown;

const styles = StyleSheet.create({
  countdownText: {fontSize: 75, color: 'red'},
});
