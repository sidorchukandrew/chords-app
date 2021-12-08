import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const BottomSheet = React.forwardRef(
  (
    {children, snapPoints = ['25%', '50%'], onDismiss, autoHeight},
    sheetRef,
  ) => {
    return (
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <BottomSheetModal
            ref={sheetRef}
            index={snapPoints.length - 1}
            snapPoints={snapPoints}
            onDismiss={onDismiss}
            style={styles.shadow}>
            <View style={styles.contentContainer}>{children}</View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.57,
    shadowRadius: 25.19,

    elevation: 23,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheet;
