import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  clearEdits,
  selectSongOnScreen,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import {getPreferredKey, hasAnyKeysSet} from '../utils/song';
import {useDispatch, useSelector} from 'react-redux';

import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SaveChangesBottomBar from '../components/SaveChangesBottomBar';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import SongContent from '../components/SongContent';
import {useEffect} from 'react';

export default function PerformSongScreen({navigation}) {
  const song = useSelector(selectSongOnScreen);
  const dispatch = useDispatch();
  const [keyOptionsVisible, setKeyOptionsVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);

  useEffect(() => {
    dispatch(clearEdits());
    let show_capo = song.capo;
    let show_transposed = song.transposed_key;

    dispatch(updateSongOnScreen({show_capo, show_transposed}));
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtonsContainer}>
          {hasAnyKeysSet(song) && (
            <Button
              style={{marginRight: 15, height: 35, width: 35, borderRadius: 8}}
              onPress={() => setKeyOptionsVisible(true)}>
              {getPreferredKey(song)}
            </Button>
          )}
          <TouchableOpacity
            style={{padding: 3}}
            onPress={() => setAdjustmentsSheetVisible(true)}>
            <Icon name="tune-vertical" size={22} color="#2464eb" />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: props => (
        <Text style={{fontWeight: '600', fontSize: 16}} numberOfLines={1}>
          {props.children}
        </Text>
      ),
    });
  }, [navigation, song]);

  return (
    <>
      <ScrollView style={styles.container}>
        <SongContent song={song} />
      </ScrollView>
      <SaveChangesBottomBar song={song} />
      <KeyOptionsBottomSheet
        visible={keyOptionsVisible}
        onDismiss={() => setKeyOptionsVisible(false)}
        song={song}
      />
      <SongAdjustmentsBottomSheet
        visible={adjustmentsSheetVisible}
        onDismiss={() => setAdjustmentsSheetVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
  },
});
