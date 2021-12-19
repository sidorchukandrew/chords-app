import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingIndicator from '../components/LoadingIndicator';
import SegmentedControl from '../components/SegmentedControl';
import SongContentTab from '../components/SongContentTab';
import SongDetailsTab from '../components/SongDetailsTab';
import SongOptionsBottomSheet from '../components/SongOptionsBottomSheet';
import {getSongById} from '../services/songsService';
import {reportError} from '../utils/error';

export default function SongDetailScreen({navigation, route}) {
  const [tab, setTab] = useState('Song');
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [song, setSong] = useState(route.params);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let {data} = await getSongById(song.id);
        setSong(data);
      } catch (error) {
        reportError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [song.id]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#eaeaea', padding: 3, borderRadius: 50}}
          onPress={() => setOptionsSheetVisible(true)}>
          <Icon name="dots-horizontal" size={22} color="#2464eb" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  function handlePerformSong() {
    navigation.navigate('Perform Song', song);
  }

  function handleEditSong() {
    navigation.navigate('Edit Song Content', song);
  }

  function renderTab() {
    if (tab === 'Song') {
      return (
        <SongContentTab
          song={song}
          onPerform={handlePerformSong}
          onEdit={handleEditSong}
        />
      );
    } else if (tab === 'Details') {
      return <SongDetailsTab song={song} onNavigateTo={handleNavigateTo} />;
    }
  }

  function handleNavigateTo(route) {
    navigation.navigate(route);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Container size="lg">
          <SegmentedControl
            options={['Song', 'Details']}
            selected={tab}
            onPress={setTab}
            style={styles.tabContainer}
          />
        </Container>
        {loading ? <LoadingIndicator /> : renderTab()}
      </ScrollView>
      <SongOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabContainer: {
    marginBottom: 20,
  },
});

const content = `
[Intro]
C Em D x2
 
[Verse 1]
C
You’re not going anywhere
G
I’m not going anywhere
D
I’m just gonna stay right here
Em             D
I’m just gonna wait here
 
[Chorus]
C
I am Yours, You are mine
G
My reward, my delight
Em          D
All my life I abide in You
C
I’m the branch, you’re the Vine
G
Everything I want to find
Em          D
All my life I abide in You
 
[Intro]
C Em D x2
 
[Verse 2]
C
You’re not going anywhere
G
I’m not going anywhere
D
Let Your love quiet fear
Em            D
Let Your love be near
 
[Chorus]
C
I am Yours, You are mine
G
My reward, my delight
Em          D
All my life I abide in You
C
I’m the branch, you’re the Vine
G
Everything I want to find
Em          D
All my life I abide in You
 
[Instrumental]
Am Em G D
 
[Bridge]
          Am                    Em
You’re my one desire, You’re my one desire
G                            D
Everything that I’m seeking, everything that I want
 
[Chorus]
C
I am Yours, You are mine
G
My reward, my delight
Em          D
All my life I abide in You
C
I’m the branch, you’re the Vine
G
Everything I want to find
Em          D
All my life I abide in You
 
[Intro]
C Em D x6
 
[Bridge 2]
C                 Em
You’re my refuge, You’re my strength
D
You’re my rest, my hiding place
C                 Em
You’re my refuge, You’re my strength
D
I abide in You, Jesus
 
[Chorus]
C
I am Yours, You are mine
G
My reward, my delight
Em          D
All my life I abide in You
C
I’m the branch, you’re the Vine
G
Everything I want to find
Em          D
All my life I abide in You
 
[Intro]
C Em D x4
 
[Outro]
C       Em   D
All my life, I abide in You
`;
