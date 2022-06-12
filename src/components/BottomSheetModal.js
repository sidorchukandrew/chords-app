import {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';

import {BottomSheetModal as LibBottomSheetModal} from '@gorhom/bottom-sheet';
import {useTheme} from '../hooks/useTheme';

const BottomSheetModal = React.forwardRef(({children, onDismiss}, ref) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const window = useWindowDimensions();
  const {surface, isDark, border} = useTheme();

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(['CONTENT_HEIGHT']);

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
      snapPoints={animatedSnapPoints}
      onDismiss={onDismiss}
      ref={ref}
      detached={true}
      contentHeight={animatedContentHeight}
      handleHeight={animatedHandleHeight}
      bottomInset={40}
      backgroundStyle={isDark ? surface.secondary : surface.primary}
      style={[styles.container, getHorizontalMargins()]}
      handleIndicatorStyle={{backgroundColor: border.primary.borderColor}}
      backdropComponent={props => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      )}>
      <BottomSheetView
        style={styles.contentContainer}
        onLayout={handleContentLayout}>
        {children}
      </BottomSheetView>
    </LibBottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 10,
  },
  contentContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
});

export default BottomSheetModal;
