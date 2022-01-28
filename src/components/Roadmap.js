import {ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RoadmapOptionsBottomSheet from './RoadmapOptionsBottomSheet';
import Tag from './Tag';
import {useDispatch, useSelector} from 'react-redux';
import {
  storeSongEdits,
  updateSongOnScreen,
} from '../redux/slices/performanceSlice';
import SectionNameBottomSheet from './SectionNameBottomSheet';
import RearrangeRoadmapModal from './RearrangeRoadmapModal';
import {selectCurrentMember} from '../redux/slices/authSlice';
import {EDIT_SONGS} from '../utils/auth';

export default function Roadmap({roadmap = [], song}) {
  const [optionsSheetVisible, setOptionsSheetVisible] = useState(false);
  const [sectionNameSheetVisible, setSectionNameSheetVisible] = useState(false);
  const [sectionBeingViewed, setSectionBeingViewed] = useState(null);
  const [rearrangeSectionsSheetVisible, setRearrangeSectionsSheetVisible] =
    useState(false);
  const dispatch = useDispatch();
  const currentMember = useSelector(selectCurrentMember);

  function handleOpenSheetForSection(sectionIndex) {
    setOptionsSheetVisible(true);
    setSectionBeingViewed(sectionIndex);
  }

  function handleDeleteSection() {
    let updatedRoadmap = roadmap.filter(
      (section, index) => index !== sectionBeingViewed,
    );
    dispatch(updateSongOnScreen({roadmap: updatedRoadmap}));

    if (currentMember.can(EDIT_SONGS)) {
      const edits = {
        songId: song.id,
        updates: {roadmap: updatedRoadmap},
      };

      dispatch(storeSongEdits(edits));
    }
  }

  function handleConfirmName(sectionName) {
    let updatedRoadmap = roadmap || [];
    if (sectionBeingViewed === -1) {
      updatedRoadmap = updatedRoadmap.concat([sectionName]);
    } else {
      updatedRoadmap = updatedRoadmap.map((section, index) =>
        index === sectionBeingViewed ? sectionName : section,
      );
    }

    dispatch(updateSongOnScreen({roadmap: updatedRoadmap}));
    if (currentMember.can(EDIT_SONGS)) {
      const edits = {
        songId: song.id,
        updates: {roadmap: updatedRoadmap},
      };

      dispatch(storeSongEdits(edits));
    }
  }

  function handleOpenNameSectionModal() {
    setSectionBeingViewed(-1);
    setSectionNameSheetVisible(true);
  }

  function handleRearrange(rearrangedRoadmap) {
    dispatch(updateSongOnScreen({roadmap: rearrangedRoadmap}));
    if (currentMember.can(EDIT_SONGS)) {
      const edits = {
        songId: song.id,
        updates: {roadmap: rearrangedRoadmap},
      };

      dispatch(storeSongEdits(edits));
    }
  }

  return (
    <>
      <ScrollView horizontal style={styles.list}>
        <Tag
          tag="+ Add"
          style={styles.section}
          onPress={handleOpenNameSectionModal}
        />
        {roadmap?.map((section, index) => (
          <Tag
            tag={section}
            key={index}
            style={styles.section}
            onPress={() => handleOpenSheetForSection(index)}
          />
        ))}
      </ScrollView>
      <RoadmapOptionsBottomSheet
        visible={optionsSheetVisible}
        onDismiss={() => setOptionsSheetVisible(false)}
        onDeleteSection={handleDeleteSection}
        onEditSection={() => setSectionNameSheetVisible(true)}
        onRearrangeSections={() => setRearrangeSectionsSheetVisible(true)}
      />
      <SectionNameBottomSheet
        visible={sectionNameSheetVisible}
        onDismiss={() => setSectionNameSheetVisible(false)}
        onConfirmName={handleConfirmName}
        currentName={roadmap?.[sectionBeingViewed]}
      />
      <RearrangeRoadmapModal
        roadmap={roadmap}
        onRearrange={handleRearrange}
        visible={rearrangeSectionsSheetVisible}
        onDismiss={() => setRearrangeSectionsSheetVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 5,
    flexDirection: 'row',
    marginBottom: 12,
  },
  section: {
    marginRight: 9,
  },
});
