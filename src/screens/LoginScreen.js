import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import AuthApi from '../api/authApi';
import Button from '../components/Button';
import Container from '../components/Container';
import FormField from '../components/FormField';
import {login} from '../redux/slices/authSlice';
import {reportError} from '../utils/error';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleNavigateToSignUp() {
    navigation.navigate('Sign Up');
  }

  function handleNavigateToForgotPassword() {
    navigation.navigate('Forgot Password');
  }

  async function handleLogin() {
    try {
      setLoading(true);
      let {headers} = await AuthApi.login(email, password);
      let auth = {
        accessToken: headers['access-token'],
        client: headers.client,
        uid: headers.uid,
      };
      setLoading(false);
      dispatch(login(auth));
      navigation.navigate('Login Team');
    } catch (error) {
      reportError(error);
      setLoading(false);
    }
    // dispatch(login());
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
          <Button onPress={handleLogin} loading={loading}>
            Login
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
