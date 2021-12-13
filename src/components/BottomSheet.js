import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet} from 'react-native';

const BottomSheet = React.forwardRef(
  ({children, snapPoints = ['25%', '50%'], onDismiss, detached}, sheetRef) => {
    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          style={styles.shadow}
          onDismiss={onDismiss}
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          detached={detached}
          bottomInset={detached ? 40 : 0}>
          {children}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
});

export default BottomSheet;
