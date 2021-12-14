import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react/cjs/react.development';
import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleNavigateToLogin}>
          <Icon name="chevron-left" size={16} />
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reset your password</Text>
        <FormField
          label="Email"
          onChange={setEmail}
          value={email}
          autoCapitalize="none"
          autoComplete="off"
        />
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <Button>Send instructions</Button>
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
    marginBottom: 10,
  },
  buttonContainer: {
    paddingBottom: 50,
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
