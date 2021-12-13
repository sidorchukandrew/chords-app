import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Container from '../components/Container';
import SetlistDetailHeader from '../components/SetlistDetailHeader';
import NoDataMessage from '../components/NoDataMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddSongsToSetlistBottomSheet from '../components/AddSongsToSetlistBottomSheet';
import SetlistOptionsBottomSheet from '../components/SetlistOptionsBottomSheet';

export default function SetlistDetailScreen({route, navigation}) {
  const [setlist, setSetlist] = useState(route.params);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setAddSongsSheetVisible(true)}>
            <Icon name="plus" size={22} color="#2464eb" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setOptionsSheetVisible(true)}>
            <Icon name="dots-horizontal" size={22} color="#2464eb" />
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation]);

  function renderSongRow({item: song}) {
    return (
      <View>
        <Text>{song}</Text>
      </View>
    );
  }

  function handleNavigateTo(route) {
    navigation.navigate(route, setlist);
  }

  return (
    <View style={styles.container}>
      <Container size="lg">
        <FlatList
          style={{height: '100%'}}
          data={setlist.songs}
          renderItem={renderSongRow}
          ListHeaderComponent={() => (
            <SetlistDetailHeader
              setlist={setlist}
              onNavigateTo={handleNavigateTo}
            />
          )}
          ListEmptyComponent={() => (
            <NoDataMessage
              buttonTitle="Add songs"
              message="No songs in this set yet"
              onButtonPress={() => setAddSongsSheetVisible(true)}
            />
          )}
        />
      </Container>
      <AddSongsToSetlistBottomSheet
        visible={addSongsSheetVisible}
        onDismiss={() => setAddSongsSheetVisible(false)}
      />
      <SetlistOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButton: {
    backgroundColor: '#eaeaea',
    padding: 3,
    borderRadius: 50,
    marginLeft: 15,
  },
});
