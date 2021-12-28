import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getPreferredKey, hasAnyKeysSet} from '../utils/song';

import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';
import {selectSongOnScreen} from '../redux/slices/performanceSlice';
import {useSelector} from 'react-redux';

export default function PerformSongScreen({route, navigation}) {
  const song = useSelector(selectSongOnScreen);
  const [keyOptionsVisible, setKeyOptionsVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 100,
          }}>
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
        <Text style={styles.content}>{song.content}</Text>
      </ScrollView>
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
  content: {
    paddingBottom: 40,
  },
});
