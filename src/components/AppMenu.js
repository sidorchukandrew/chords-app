import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RectButton from './RectButton';
import {useNetInfo} from '@react-native-community/netinfo';
import {useSelector} from 'react-redux';
import {selectCurrentTeam} from '../redux/slices/authSlice';
import ProfilePicture from './ProfilePicture';
import {useTheme} from '../hooks/useTheme';
import {selectCurrentSubscription} from '../redux/slices/subscriptionSlice';

export default function AppMenu({visible, onClose, onNavigateTo}) {
  const sheetRef = useRef();
  const [windowWidth, setWindowWidth] = useState(0);
  const currentTeam = useSelector(selectCurrentTeam);
  const window = useWindowDimensions();
  const currentSubscription = useSelector(selectCurrentSubscription);
  const {isConnected} = useNetInfo();
  const {surface, text, isDark} = useTheme();

  useEffect(() => {
    // if (windowWidth > window.width || windowWidth === 0) {
    setWindowWidth(window.width);
    // }
  }, [window]);

  useEffect(() => {
    if (visible) sheetRef.current?.present?.();
  }, [visible, sheetRef]);

  function handleNavigateTo(route) {
    onNavigateTo(route);
    sheetRef.current?.dismiss();
  }

  function getHorizontalMargins() {
    let calculatedMargin = (windowWidth - 375) / 2;
    let minMargin = 10;

    let actualMargin = calculatedMargin < 1 ? minMargin : calculatedMargin;

    return {marginHorizontal: actualMargin};
  }

  return (
    <BottomSheetModal
      snapPoints={['50%']}
      onDismiss={onClose}
      ref={sheetRef}
      detached
      bottomInset={146}
      style={[styles.container, getHorizontalMargins()]}
      backgroundStyle={isDark ? surface.tertiary : surface.primary}
      contentHeight={200}
      backdropComponent={props => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      )}>
      <BottomSheetView
        style={{paddingTop: 12, paddingBottom: 12, paddingHorizontal: 16}}>
        <View style={styles.teamDetailsContainer}>
          <ProfilePicture url={currentTeam.image_url} size="md" />
          <Text style={[styles.teamNameText, text.primary]}>
            {currentTeam.name}
          </Text>
        </View>
        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Dashboard')}>
          <Icon
            name="view-dashboard"
            size={20}
            style={[styles.icon, text.secondary]}
          />
          <Text style={[styles.text, text.secondary]}>Dashboard</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Binders')}>
          <Icon
            name="folder-music"
            size={20}
            style={[styles.icon, text.secondary]}
          />
          <Text style={[styles.text, text.secondary]}>Binders</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Songs')}>
          <IonIcon
            name="musical-notes"
            size={20}
            style={[styles.icon, text.secondary]}
          />
          <Text style={[styles.text, text.secondary]}>Songs</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Sets')}>
          <Icon
            name="playlist-music"
            size={20}
            style={[styles.icon, text.secondary]}
          />
          <Text style={[styles.text, text.secondary]}>Sets</Text>
        </RectButton>
        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Members')}>
          <Icon
            name="account-group"
            size={20}
            style={[styles.icon, text.secondary]}
          />
          <Text style={[styles.text, text.secondary]}>Team members</Text>
        </RectButton>

        {currentSubscription.isPro && (
          <RectButton
            styles={styles.button}
            onPress={() => handleNavigateTo('Calendar')}>
            <Icon
              name="calendar-month"
              size={20}
              style={[styles.icon, text.secondary]}
            />
            <Text style={[styles.text, text.secondary]}>Calendar</Text>
          </RectButton>
        )}

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Choose Team')}
          disabled={!isConnected}>
          <Icon
            name="swap-horizontal"
            size={20}
            style={[styles.icon, text.secondary, !isConnected && text.disabled]}
          />
          <Text
            style={[
              styles.text,
              text.secondary,
              !isConnected && text.disabled,
            ]}>
            Switch teams
          </Text>
        </RectButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
  },
  disabledColor: {
    color: '#d0d0d0',
  },
  teamDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  teamNameText: {
    fontWeight: '600',
    fontSize: 19,
    color: '#374251',
    marginLeft: 15,
  },
});
