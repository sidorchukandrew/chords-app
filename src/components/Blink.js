import {Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

export default function Blink({children, duration = 1000}) {
  const opacityRef = useRef(new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityRef.current, {
          toValue: 0.1,
          duration: duration,
          useNativeDriver: false,
        }),
        Animated.timing(opacityRef.current, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [duration]);

  return (
    <Animated.View style={{opacity: opacityRef.current}}>
      {children}
    </Animated.View>
  );
}
