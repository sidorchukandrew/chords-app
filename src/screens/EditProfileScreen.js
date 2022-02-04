import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

export default function EditProfileScreen({navigation}) {
  const currentMember = useSelector(selectCurrentMember);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(currentMember?.first_name || '');
  const [lastName, setLastName] = useState(currentMember?.last_name || '');
  const [phoneNumber, setPhoneNumber] = useState(
    currentMember?.phone_number || '',
  );
  const [updates, setUpdates] = useState({});
  const [imageUrl, setImageUrl] = useState(currentMember?.image_url || null);
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
      headerRight: () => (
        <TouchableOpacity onPress={handleSave}>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Text
              style={[
                styles.saveButtonText,
                isEmpty(updates) && styles.disabledText,
              ]}>
              Save
            </Text>
          )}
        </TouchableOpacity>
      ),
    });
  }, [navigation, updates, loading]);

  return (
    <ScrollView style={styles.screen}>
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
            <Text style={styles.changePictureText}>Change profile picture</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  profilePictureContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  changePictureButton: {
    marginTop: 10,
  },
  changePictureText: {
    fontWeight: '500',
    color: '#2464eb',
  },
  fieldsContainer: {},
  saveButtonText: {
    color: '#2464eb',
    fontWeight: '600',
    fontSize: 17,
  },
  disabledText: {
    color: '#d0d0d0',
  },
});
