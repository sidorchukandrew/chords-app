import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet} from 'react-native';

const BottomSheet = React.forwardRef(
  ({children, snapPoints = ['25%', '50%'], onDismiss, detached}, sheetRef) => {
    return (
      <BottomSheetModal
        style={styles.shadow}
        onDismiss={onDismiss}
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        detached={detached}
        bottomInset={detached ? 40 : 0}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}>
        {children}
      </BottomSheetModal>
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
