import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DashboardWidget from './DashboardWidget';
import {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getRecentlyViewedSongs} from '../services/songsService';
import NoDataMessage from './NoDataMessage';
import ItemSeparator from './ItemSeparator';

export default function RecentlyViewedSongsWidget({navigation}) {
  const [songs, setSongs] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      setSongs(getRecentlyViewedSongs());
    }, []),
  );

  return (
    <DashboardWidget
      title="Recently viewed"
      headerActionText="View all"
      onHeaderActionPress={() => navigation.navigate('Songs')}>
      <ScrollView style={{maxHeight: 130}}>
        {songs.length === 0 ? (
          <NoDataMessage message="No recently viewed songs" />
        ) : (
          songs.map((song, index) => (
            <View key={song.id}>
              <TouchableOpacity
                style={styles.row}
                onPress={() => navigation.navigate('Song Detail', song)}>
                <Text style={styles.songNameText}>{song.name}</Text>
              </TouchableOpacity>
              {index < songs.length - 1 && <ItemSeparator />}
            </View>
          ))
        )}
      </ScrollView>
    </DashboardWidget>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  songNameText: {
    color: 'black',
  },
});
