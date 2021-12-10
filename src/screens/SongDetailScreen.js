import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from '../components/Container';
import AccentButton from '../components/AccentButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SongDetailScreen({navigation}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{backgroundColor: '#eaeaea', padding: 3, borderRadius: 50}}>
          <Icon name="dots-horizontal" size={22} color="#2464eb" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <Container size="lg">
        <View style={styles.shortcutsContainer}>
          <AccentButton style={{paddingVertical: 10, marginRight: 5}} full>
            <View style={styles.shortcut}>
              <Icon name="pencil" size={20} style={styles.shortcutIcon} />
              <Text style={styles.shortcutText}>Edit</Text>
            </View>
          </AccentButton>
          <AccentButton style={{paddingVertical: 10, marginLeft: 5}} full>
            <View style={styles.shortcut}>
              <Icon name="play-circle" size={20} style={styles.shortcutIcon} />
              <Text style={styles.shortcutText}>Perform</Text>
            </View>
          </AccentButton>
        </View>
        <Text>{content}</Text>
      </Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  shortcutsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  shortcut: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  shortcutIcon: {
    color: '#2464eb',
    marginRight: 8,
  },
  shortcutText: {
    color: '#2464eb',
    fontWeight: '700',
    fontSize: 15,
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
