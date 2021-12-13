import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react/cjs/react.development';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BinderDetailHeader from '../components/BinderDetailHeader';
import NoDataMessage from '../components/NoDataMessage';
import AddSongsToBinderBottomSheet from '../components/AddSongsToBinderBottomSheet';
import BinderOptionsBottomSheet from '../components/BinderOptionsBottomSheet';

export default function BinderDetailScreen({navigation, route}) {
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [addSongsSheetVisible, setAddSongsSheetVisible] = useState(false);
  const [binder, setBinder] = useState(route.params);

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

  function renderRow({item: song}) {
    return (
      <View>
        <Text>Song</Text>
      </View>
    );
  }

  function handleNavigateTo(route) {
    navigation.navigate(route, binder);
  }

  return (
    <View style={styles.container}>
      <Container size="lg">
        <FlatList
          style={{height: '100%'}}
          ListHeaderComponent={() => <BinderDetailHeader binder={binder} />}
          ListEmptyComponent={() => (
            <NoDataMessage
              message="There are no songs in this binder yet"
              buttonTitle="Add songs"
              onButtonPress={() => setAddSongsSheetVisible(true)}
            />
          )}
          data={[]}
          renderItem={renderRow}
        />
      </Container>
      <AddSongsToBinderBottomSheet
        visible={addSongsSheetVisible}
        onDismiss={() => setAddSongsSheetVisible(false)}
      />
      <BinderOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onNavigateTo={handleNavigateTo}
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
    marginLeft: 10,
  },
});
