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

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateToSignUp() {
    navigation.navigate('Sign Up');
  }

  function handleNavigateToForgotPassword() {
    navigation.navigate('Forgot Password');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <Text style={styles.title}>Let's sign you in</Text>
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
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleNavigateToForgotPassword}>
          <Text style={styles.buttonText}>Forgot password?</Text>
        </TouchableOpacity>
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <View style={styles.signupContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleNavigateToSignUp}>
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <Button>Login</Button>
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
  signupContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  signupButton: {
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2464eb',
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
});
