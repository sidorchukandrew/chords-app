import React, {useEffect} from 'react';
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
import zxcvbn from 'zxcvbn';
import PasswordRequirements from '../components/PasswordRequirements';
import {reportError} from '../utils/error';
import AuthApi from '../api/authApi';
import AlertBubble from '../components/AlertBubble';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isLongEnough, setIsLongEnough] = useState(false);
  const [isUncommon, setIsUncommon] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  useEffect(() => {
    setPasswordsMatch(password === confirmedPassword);
    setIsLongEnough(password?.length >= 8);

    let {score: passwordScore} = zxcvbn(password);
    setIsUncommon(passwordScore >= 3);
  }, [password, confirmedPassword]);

  function canSignUp() {
    return !!email && isUncommon && isLongEnough && passwordsMatch;
  }

  async function handleSignUp() {
    try {
      setLoading(true);
      await AuthApi.signUp(email, password, confirmedPassword);
      clearState();
      navigation.navigate('Check Email');
    } catch (error) {
      reportError(error);
      setErrored(true);
    } finally {
      setLoading(false);
    }
  }

  function clearState() {
    setEmail('');
    setConfirmedPassword('');
    setPasswordsMatch(false);
    setIsLongEnough(false);
    setIsUncommon(false);
    setPassword('');
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

        <PasswordRequirements
          isLongEnough={isLongEnough}
          isUncommon={isUncommon}
        />
        <FormField
          label="Confirm password"
          onChange={setConfirmedPassword}
          value={confirmedPassword}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry
        />

        {errored && (
          <AlertBubble
            message="We were unable to create your account"
            onDismiss={() => setErrored(false)}
            style={styles.alert}
            dismissable
          />
        )}
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
          <Button
            disabled={!canSignUp()}
            onPress={handleSignUp}
            loading={loading}>
            Sign up
          </Button>
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
  alert: {
    marginTop: 20,
  },
});
