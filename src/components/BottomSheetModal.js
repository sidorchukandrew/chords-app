import {BottomSheetBackdrop, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';

import {BottomSheetModal as LibBottomSheetModal} from '@gorhom/bottom-sheet';

const BottomSheetModal = React.forwardRef(({children, onDismiss}, ref) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const window = useWindowDimensions();

  useEffect(() => {
    setWindowWidth(window.width);
  }, [window]);

  function getHorizontalMargins() {
    let calculatedMargin = (windowWidth - 475) / 2;
    let minMargin = 10;

    let actualMargin = calculatedMargin < 1 ? minMargin : calculatedMargin;

    return {marginHorizontal: actualMargin};
  }

  return (
    <LibBottomSheetModal
      snapPoints={['50%']}
      onDismiss={onDismiss}
      ref={ref}
      detached={true}
      bottomInset={146}
      style={[styles.container, getHorizontalMargins()]}
      contentHeight={200}
      backdropComponent={props => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      )}>
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </LibBottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 10,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
});

export default BottomSheetModal;
