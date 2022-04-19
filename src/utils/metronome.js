import {NativeModules} from 'react-native';
const MetronomeModule = NativeModules.MetronomeModule;

class Metronome {
  isPlaying;
  constructor() {
    this.bpm = 60;
    this.isPlaying = false;
  }

  getBpm() {
    return this.bpm;
  }

  setBpm(newBpm) {
    MetronomeModule.setBPM(newBpm);
    this.bpm = newBpm;
  }

  start() {
    MetronomeModule.start();
    this.isPlaying = true;
  }

  stop() {
    MetronomeModule.stop();
    this.isPlaying = false;
  }

  toggle() {
    this.isPlaying ? this.stop() : this.start();
  }
}

let metronome = new Metronome();

export default metronome;
