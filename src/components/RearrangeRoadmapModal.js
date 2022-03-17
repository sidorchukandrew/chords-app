import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BottomSheet from './BottomSheet';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemSeparator from './ItemSeparator';
import {useTheme} from '../hooks/useTheme';

export default function RearrangeRoadmapModal({
  roadmap = [],
  onRearrange,
  visible,
  onDismiss,
}) {
  const sheetRef = useRef();
  const {surface, text, blue, isDark} = useTheme();

  const [localRoadmap, setLocalRoadmap] = useState(
    () => roadmap?.map((section, index) => ({section, id: index})) || [],
  );

  useEffect(() => {
    setLocalRoadmap(
      roadmap?.map((section, index) => ({section, id: index})) || [],
    );
  }, [roadmap]);

  useEffect(() => {
    if (visible) sheetRef.current?.present();
  }, [visible, sheetRef]);

  function handleDismiss() {
    // setLocalRoadmap(
    //   roadmap?.map((section, index) => ({section, id: index})) || [],
    // );
    sheetRef.current?.dismiss();
    onDismiss();
  }

  function handleConfirm() {
    onRearrange(localRoadmap.map(({section}) => section));
    handleDismiss();
  }

  function renderRow({item, drag, isActive}) {
    return (
      <ScaleDecorator activeScale={1}>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={styles.sectionRow}>
          <Text style={[styles.sectionText, text.primary]}>{item.section}</Text>
          <Icon name="drag" size={18} color={text.secondary.color} />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  }

  return (
    <BottomSheet ref={sheetRef} onDismiss={onDismiss} snapPoints={['90%']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleDismiss}>
            <Text style={[styles.headerButtonText, blue.text]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleConfirm}>
            <Text style={[styles.headerButtonText, blue.text]}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <DraggableFlatList
          data={localRoadmap}
          keyExtractor={(item, index) => item.id}
          renderItem={renderRow}
          ItemSeparatorComponent={ItemSeparator}
          onDragEnd={({data}) => setLocalRoadmap(data)}
          style={styles.list}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    height: '100%',
  },
  sectionRow: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerButtonText: {
    fontWeight: '500',
  },
});
