import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useTheme} from '../hooks/useTheme';

const BottomSheet = React.forwardRef(
  (
    {
      children,
      snapPoints = ['25%', '50%'],
      onDismiss,
      detached,
      snapIndex = 0,
      dynamicHeight,
    },
    sheetRef,
  ) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const window = useWindowDimensions();
    const {surface, isDark} = useTheme();

    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints);

    useEffect(() => {
      setWindowWidth(window.width);
    }, [window]);

    function getHorizontalMargins() {
      let calculatedMargin = (windowWidth - 450) / 2;
      let minMargin = 0;

      let actualMargin = calculatedMargin < 1 ? minMargin : calculatedMargin;

      return {marginHorizontal: actualMargin};
    }

    return dynamicHeight ? (
      <BottomSheetModal
        style={[styles.shadow, getHorizontalMargins()]}
        onDismiss={onDismiss}
        ref={sheetRef}
        index={snapIndex}
        snapPoints={animatedSnapPoints}
        detached={detached}
        contentHeight={animatedContentHeight}
        handleHeight={animatedHandleHeight}
        bottomInset={detached ? 40 : 0}
        backgroundStyle={isDark ? surface.secondary : surface.primary}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}>
        <BottomSheetView
          onLayout={handleContentLayout}
          style={{paddingBottom: 20}}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    ) : (
      <BottomSheetModal
        style={[styles.shadow, getHorizontalMargins()]}
        onDismiss={onDismiss}
        ref={sheetRef}
        index={snapIndex}
        snapPoints={snapPoints}
        detached={detached}
        bottomInset={detached ? 40 : 0}
        backgroundStyle={isDark ? surface.secondary : surface.primary}
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
