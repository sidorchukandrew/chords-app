import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {
  selectCurrentMember,
  updateCurrentMember,
  updateCurrentUser,
} from '../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';

import Container from '../components/Container';
import FilesApi from '../api/filesApi';
import FormField from '../components/FormField';
import LoadingIndicator from '../components/LoadingIndicator';
import ProfilePicture from '../components/ProfilePicture';
import {isEmpty} from '../utils/object';
import {launchImageLibrary} from 'react-native-image-picker';
import {reportError} from '../utils/error';
import {updateCurrentUser as updateUserInApi} from '../services/usersService';
import {useNetInfo} from '@react-native-community/netinfo';
import {useTheme} from '../hooks/useTheme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function EditProfileScreen({navigation}) {
  const {text, surface, blue} = useTheme();
  const currentMember = useSelector(selectCurrentMember);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(currentMember?.first_name || '');
  const [lastName, setLastName] = useState(currentMember?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(
    currentMember?.phone_number || '',
  );
  const [updates, setUpdates] = useState({});
  const [imageUrl, setImageUrl] = useState(currentMember?.image_url || null);
  const {isConnected} = useNetInfo();
  const dispatch = useDispatch();

  function handleFieldChange(field, value, setter) {
    setter(value);
    setUpdates(currentUpdates => ({...currentUpdates, [field]: value}));
  }

  async function handleSave() {
    try {
      setLoading(true);
      if (updates.image_url) {
        await FilesApi.addImageToUser(updates.image_url);
      }
      await updateUserInApi(updates);
      dispatch(updateCurrentUser(updates));
      dispatch(updateCurrentMember(updates));

      setUpdates({});
    } catch (error) {
      reportError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleChooseImageFromLibrary() {
    try {
      let {assets} = await launchImageLibrary();
      if (assets?.length > 0) {
        let image = assets[0].uri;
        handleFieldChange('image_url', image, setImageUrl);
      }
    } catch (error) {
      reportError(error);
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: text.primary,
      headerStyle: surface.primary,
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSave}
          disabled={isEmpty(updates) || !isConnected}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Text
              style={[
                styles.saveButtonText,
                blue.text,
                (isEmpty(updates) || !isConnected) && text.disabled,
              ]}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, updates, loading, isConnected, blue, text]);

  return (
    <KeyboardAwareScrollView style={[surface.primary]}>
      {/* <ScrollView> */}
      <Container>
        <View style={styles.profilePictureContainer}>
          <ProfilePicture
            url={imageUrl}
            size="xl"
            member={currentMember}
            style={styles.profilePicture}
          />
          <TouchableOpacity
            onPress={handleChooseImageFromLibrary}
            style={styles.changePictureButton}>
            <Text style={[styles.changePictureText, blue.text]}>
              Change profile picture
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fieldContainer}>
          <FormField
            label="First name"
            value={firstName}
            onChange={newValue =>
              handleFieldChange('first_name', newValue, setFirstName)
            }
          />
          <FormField
            label="Last name"
            value={lastName}
            onChange={newValue =>
              handleFieldChange('last_name', newValue, setLastName)
            }
          />
          <FormField
            label="Phone number"
            value={phoneNumber}
            onChange={newValue =>
              handleFieldChange('phone_number', newValue, setPhoneNumber)
            }
            keyboardType="phone-pad"
          />
        </View>
      </Container>
      {/* </ScrollView> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  profilePictureContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changePictureButton: {
    marginTop: 10,
  },
  changePictureText: {
    fontWeight: '500',
  },
  fieldsContainer: {},
  saveButtonText: {
    fontWeight: '600',
    fontSize: 17,
  },
});
