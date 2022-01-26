import {StyleSheet, Image, View, Text} from 'react-native';
import React from 'react';
import ScreenModal from './ScreenModal';
import Container from '../components/Container';
import Button from '../components/Button';

export default function CheckEmailModal({navigation}) {
  function handleGoToLoginScreen() {
    navigation.goBack();
    navigation.push('Login');
  }

  return (
    <ScreenModal>
      <View style={styles.screen}>
        <Image
          style={styles.paperAirplane}
          source={require('../img/mail.png')}
        />
        <Container size="sm" style={styles.textContainer}>
          <Text style={styles.titleText}>Check your email!</Text>
          <Text style={styles.descriptionText}>
            To confirm your email address, tap the button in the email we sent
            you.
          </Text>
          <Button onPress={handleGoToLoginScreen} style={styles.loginButton}>
            Login Now
          </Button>
        </Container>
      </View>
    </ScreenModal>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#2464eb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperAirplane: {
    width: 200,
    height: 200,
    transform: [{rotate: '20deg'}],
    marginBottom: '8%',
  },
  titleText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 27,
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#1c4fbb',
    flexGrow: 0,
    width: '100%',
    marginTop: 30,
  },
  textContainer: {flexGrow: 0, width: '100%'},
});
