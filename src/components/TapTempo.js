import {StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import AccentButton from './AccentButton';
import _ from 'lodash';

export default function TapTempo({onBpmChange}) {
  const [taps, setTaps] = useState([]);

  function handleTap() {
    let updatedTaps = taps.concat(Date.now());
    setTaps(updatedTaps);
    debounceResetTaps();

    if (updatedTaps.length > 4) {
      calculateTempo();
    }
  }

  function calculateTempo() {
    let lastFour = taps.slice(-4);
    let bpmOne = convertToBpm(lastFour[1] - lastFour[0]);
    let bpmTwo = convertToBpm(lastFour[2] - lastFour[1]);
    let bpmThree = convertToBpm(lastFour[3] - lastFour[2]);
    let average = (bpmOne + bpmTwo + bpmThree) / 3;

    onBpmChange(Math.trunc(average));
  }

  function convertToBpm(milliseconds) {
    let frequency = milliseconds / 1000;
    return 60 / frequency;
  }

  // eslint-disable-next-line
  const debounceResetTaps = useCallback(
    _.debounce(() => {
      setTaps([]);
    }, [3000]),
    [],
  );

  return (
    <AccentButton style={{width: '100%'}} onPress={handleTap}>
      Tap tempo
    </AccentButton>
  );
}

const styles = StyleSheet.create({});
