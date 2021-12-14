import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AccentButton from '../components/AccentButton';
import Button from '../components/Button';
import Container from '../components/Container';

export default function AuthScreen({navigation}) {
  function handleNavigateToLogin() {
    navigation.navigate('Login');
  }

  function handleNavigateToSignUp() {
    navigation.navigate('Sign Up');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filler}>
        <Text style={styles.title}>Cadence</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Container size="sm">
          <Button onPress={handleNavigateToSignUp} style={styles.createButton}>
            Create an account
          </Button>
          <AccentButton onPress={handleNavigateToLogin}>Login</AccentButton>
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
  filler: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 40,
  },
  buttonsContainer: {
    paddingBottom: 70,
  },
  createButton: {
    marginBottom: 10,
  },
});
