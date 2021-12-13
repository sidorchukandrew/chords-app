import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';

export default function PerformSetlistScreen({navigation}) {
  const windowWidth = useWindowDimensions().width;
  const [songs, setSongs] = useState(() => [content, content, content]);
  const [songIndex, setSongIndex] = useState(0);
  const [keyOptionsSheetVisible, setKeyOptionsSheetVisible] = useState(false);
  const [adjustmentsSheetVisible, setAdjustmentsSheetVisible] = useState(false);

  React.useLayoutEffect(() => {
    const titles = ['Amazing Grace', 'How Great Thou Art', 'The First Noel'];
    navigation.setOptions({
      title: titles[songIndex],
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 100,
          }}>
          <Button
            style={{marginRight: 15, height: 43, width: 43}}
            onPress={() => setKeyOptionsSheetVisible(true)}>
            Ab
          </Button>
          <TouchableOpacity
            style={{padding: 3}}
            onPress={() => setAdjustmentsSheetVisible(true)}>
            <Icon name="tune-vertical" size={22} color="#2464eb" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, songIndex]);

  function renderSlide({item: song}) {
    return (
      <ScrollView
        style={{
          width: '100%',
          flexGrow: 1,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}>
        <Text>{song}</Text>
      </ScrollView>
    );
  }

  function handleSwipedToSong(index) {
    setSongIndex(index);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
      <Carousel
        layout="default"
        data={songs}
        renderItem={renderSlide}
        itemWidth={windowWidth}
        sliderWidth={windowWidth}
        onSnapToItem={handleSwipedToSong}
      />
      <KeyOptionsBottomSheet
        visible={keyOptionsSheetVisible}
        onDismiss={() => setKeyOptionsSheetVisible(false)}
      />
      <SongAdjustmentsBottomSheet
        visible={adjustmentsSheetVisible}
        onDismiss={() => setAdjustmentsSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

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
