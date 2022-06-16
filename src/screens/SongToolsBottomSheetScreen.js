import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import RectButton from '../components/RectButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../hooks/useTheme';
import {useSelector} from 'react-redux';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';
import {useNetInfo} from '@react-native-community/netinfo';

export default function SongToolsBottomSheetScreen({navigation, route}) {
  const {blue, text} = useTheme();
  const currentSubscription = useSelector(selectCurrentSubscription);
  const {isConnected} = useNetInfo();

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
      {route.params.sessionsEnabled && currentSubscription.isPro && (
        <RectButton
          styles={styles.toolButton}
          onPress={() => navigation.push('Sessions')}
          disabled={!isConnected}>
          <View style={styles.toolLeftContainer}>
            <MaterialIcon
              name="connect-without-contact"
              size={22}
              color={isConnected ? blue.text.color : text.disabled.color}
            />
            <Text
              style={[
                styles.buttonText,
                isConnected ? text.primary : text.disabled,
              ]}>
              Sessions
            </Text>
          </View>
          <Icon name="chevron-right" size={18} color={text.primary.color} />
        </RectButton>
      )}
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
