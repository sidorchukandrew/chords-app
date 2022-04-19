import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import RectButton from '../components/RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';

export default function SongToolsBottomSheetScreen({navigation}) {
  const {blue, text} = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.screen]}>
      {/* <RectButton
        styles={styles.toolButton}
        onPress={() => navigation.push('Autoscroll')}>
        <View style={styles.toolLeftContainer}>
          <Icon name="mouse" size={22} color={blue.text.color} />
          <Text style={[styles.buttonText, text.primary]}>Autoscroll</Text>
        </View>
        <Icon name="chevron-right" size={18} color={text.primary.color} />
      </RectButton> */}
      <RectButton
        styles={styles.toolButton}
        onPress={() => navigation.push('Metronome')}>
        <View style={styles.toolLeftContainer}>
          <Icon name="metronome" size={22} color={blue.text.color} />
          <Text style={[styles.buttonText, text.primary]}>Metronome</Text>
        </View>
        <Icon name="chevron-right" size={18} color={text.primary.color} />
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  toolButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    marginLeft: 15,
  },
});
