import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/Button';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FormField from '../components/FormField';
import {useDispatch} from 'react-redux';
import {loginTeam} from '../redux/slices/authSlice';

export default function CreateTeamScreen({navigation}) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  function handleCreateTeam() {
    dispatch(loginTeam({name}));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Icon name="chevron-left" size={16} color="#505050" />
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Give your team a name</Text>
        <FormField label="Name" onChange={setName} value={name} />
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <Button onPress={handleCreateTeam}>Create</Button>
        </Container>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingVertical: 30,
  },
  backButton: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
    color: '#505050',
  },
});
