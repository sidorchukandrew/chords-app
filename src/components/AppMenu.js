import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import RectButton from './RectButton';
import {useState} from 'react/cjs/react.development';

export default function AppMenu({visible, onClose, onNavigateTo}) {
  const sheetRef = useRef();
  const [windowWidth, setWindowWidth] = useState(0);
  const window = useWindowDimensions();

  useEffect(() => {
    if (windowWidth > window.width || windowWidth === 0) {
      setWindowWidth(window.width);
    }
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
      bottomInset={46}
      style={[styles.container, getHorizontalMargins()]}
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
        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Dashboard')}>
          <Icon name="view-dashboard" size={20} style={styles.icon} />
          <Text style={styles.text}>Dashboard</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Binders')}>
          <Icon name="folder-music" size={20} style={styles.icon} />
          <Text style={styles.text}>Binders</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Songs')}>
          <IonIcon name="musical-notes" size={20} style={styles.icon} />
          <Text style={styles.text}>Songs</Text>
        </RectButton>

        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Sets')}>
          <Icon name="playlist-music" size={20} style={styles.icon} />
          <Text style={styles.text}>Sets</Text>
        </RectButton>
        <RectButton
          styles={styles.button}
          onPress={() => handleNavigateTo('Members')}>
          <Icon name="account-group" size={20} style={styles.icon} />
          <Text style={styles.text}>Team members</Text>
        </RectButton>

        <RectButton styles={styles.button}>
          <Icon name="swap-horizontal" size={20} style={styles.icon} />
          <Text style={styles.text}>Switch teams</Text>
        </RectButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
    color: '#374251',
  },
  text: {
    fontSize: 16,
    color: '#374251',
    fontWeight: '500',
  },
});
