import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ScreenModalHeader({
  title,
  onBackPress,
  onSavePress,
  saveDisabled,
  options = {saveVisible: false, backVisible: false},
}) {
  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.container}>
        {options.backVisible ? (
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={onBackPress} style={[styles.backButton]}>
              <Text>
                <Icon name="close" color="#4a4a4a" size={22} />
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.backButton} />
        )}
        <Text style={[styles.headerTitle, styles.grow]}>{title}</Text>
        {options.saveVisible ? (
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={onSavePress}
              disabled={saveDisabled}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.saveButton} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 17,
  },
  backButton: {
    width: 30,
  },
  backButtonContainer: {
    flex: 1,
  },
  saveButton: {
    width: 40,
    alignItems: 'flex-end',
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
  saveButtonText: {
    color: '#2464eb',
    fontWeight: '600',
    fontSize: 17,
  },
});
