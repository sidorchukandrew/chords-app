import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BottomSheet = React.forwardRef(({children, button}, sheetRef) => {
  function handleSheetChanges(index) {
    console.log(index);
  }

  return (
    <BottomSheetModalProvider>
      {button}
      <View style={styles.container}>
        <BottomSheetModal ref={sheetRef} index={1} snapPoints={['25%', '50%']}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheet;
