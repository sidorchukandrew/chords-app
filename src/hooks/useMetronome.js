import {useState} from 'react';
import {NativeModules} from 'react-native';
const MetronomeModule = NativeModules.MetronomeModule;

export function useMetronome() {
  const [bpm, _setBpm] = useState(60);

  function setBpm(newBpm) {
    _setBpm(newBpm);
    MetronomeModule.setBPM(newBpm);
  }

  function start() {
    MetronomeModule.start();
  }

  function stop() {
    MetronomeModule.stop();
  }

  return {setBpm, bpm, start, stop};
}
