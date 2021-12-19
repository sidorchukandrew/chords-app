import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Container from '../components/Container';

export default function EditSongContentScreen({navigation, route}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [localContent, setLocalContent] = useState(
    route?.params?.content || '',
  );

  return (
    <Container size="lg" style={styles.container}>
      <TextInput
        value={localContent}
        onChangeText={setLocalContent}
        multiline
        style={styles.input}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  input: {
    backgroundColor: 'red',
    height: '100%',
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  saveButtonText: {
    color: '#2464eb',
    fontWeight: '600',
    fontSize: 17,
  },
});
