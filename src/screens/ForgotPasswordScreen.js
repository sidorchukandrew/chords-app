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
import FormField from '../components/FormField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {reportError} from '../utils/error';
import AuthApi from '../api/authApi';
import AlertBubble from '../components/AlertBubble';

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  async function handleSendInstructions() {
    try {
      setLoading(true);
      await AuthApi.sendResetPasswordInstructions(email);
      navigation.navigate('Check Email For Password');
    } catch (error) {
      reportError(error);
      setErrored(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Container style={styles.formContainer} size="sm">
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleNavigateToLogin}>
          <Icon name="chevron-left" size={16} color="#505050" />
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reset your password</Text>
        <FormField
          label="Email"
          onChange={setEmail}
          value={email}
          autoCapitalize="none"
          autoComplete="off"
          keyboardType="email-address"
        />
        {errored && (
          <AlertBubble
            style={styles.alert}
            message="We were not able to send you reset instructions"
            dismissable
            onDismiss={() => setErrored(false)}
          />
        )}
      </Container>
      <View style={styles.buttonContainer}>
        <Container size="sm">
          <Button
            loading={loading}
            disabled={!email}
            onPress={handleSendInstructions}>
            Send instructions
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
  alert: {
    marginTop: 20,
  },
});
