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

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <Text style={styles.title}>Create your account</Text>
        <FormField
          label="Email"
          onChange={setEmail}
          value={email}
          autoCapitalize="none"
          autoComplete="off"
        />
        <FormField
          label="Password"
          onChange={setPassword}
          value={password}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry
        />

        <FormField
          label="Confirm password"
          onChange={setConfirmedPassword}
          value={confirmedPassword}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry
        />
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleNavigateToLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Button>Sign up</Button>
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
  loginContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  loginButton: {
    marginLeft: 10,
  },
  loginButtonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2464eb',
  },
});
