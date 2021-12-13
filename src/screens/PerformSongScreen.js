import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react/cjs/react.development';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/Button';
import KeyOptionsBottomSheet from '../components/KeyOptionsBottomSheet';
import SongAdjustmentsBottomSheet from '../components/SongAdjustmentsBottomSheet';

export default function PerformSongScreen({route, navigation}) {
  const [song, setSong] = useState(route.params);
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
          <Button
            style={{marginRight: 10, paddingHorizontal: 12}}
            onPress={() => setKeyOptionsVisible(true)}>
            Ab
          </Button>
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
  }, [navigation]);
  return (
    <>
      <ScrollView style={styles.container}>
        <Text>{song.content}</Text>
      </ScrollView>
      <KeyOptionsBottomSheet
        visible={keyOptionsVisible}
        onDismiss={() => setKeyOptionsVisible(false)}
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
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 10,
  },
});
