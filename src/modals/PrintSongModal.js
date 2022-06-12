import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ScreenModal from './ScreenModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-pdf';
import LoadingIndicator from '../components/LoadingIndicator';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import {useSelector} from 'react-redux';
import {selectSongOnScreen} from '../redux/slices/performanceSlice';
import {buildPdfContent} from '../utils/pdf';
import RNPrint from 'react-native-print';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import {useTheme} from '../hooks/useTheme';

export default function PrintSongModal({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const [uri, setUri] = useState();
  const [showAdjustmentsSheet, setShowAdjustmentsSheet] = useState(false);
  const {text, blue} = useTheme();
  let regenerationCount = useRef(0);

  useEffect(() => {
    async function generatePdf() {
      let options = {
        html: buildPdfContent(song, {withPadding: true}),
        fileName: `test-${regenerationCount.current}`,
        base64: true,
        padding: 46,
        bgColor: '#ffffff',
        fonts: [
          resolveAssetSource(
            require('../../assets/fonts/RobotoMono-Regular.ttf'),
            require('../../assets/fonts/OpenSans-Regular.ttf'),
          ).uri,
        ],
      };

      let file = await RNHTMLtoPDF.convert(options);

      setUri(file.filePath);
    }

    regenerationCount.current = regenerationCount.current + 1;
    generatePdf();
  }, [song]);

  async function handleShowPrintDialog() {
    try {
      await RNPrint.print({filePath: uri});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScreenModal>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 5}}>
          <Icon name="close" size={22} color={text.secondary.color} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleShowPrintDialog}>
            <Icon name="printer" size={22} color={blue.text.color} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowAdjustmentsSheet(true)}>
            <Icon name="tune-vertical" size={22} color={blue.text.color} />
          </TouchableOpacity>
        </View>
      </View>
      {uri ? (
        <Pdf source={{uri: uri}} style={styles.pdf} minScale={0.5} />
      ) : (
        <LoadingIndicator />
      )}
      <SongAdjustmentsBottomSheet
        visible={showAdjustmentsSheet}
        onDismiss={() => setShowAdjustmentsSheet(false)}
      />
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 65,
  },
});
