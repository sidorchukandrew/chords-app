const LINES_REGEX = new RegExp(/\r\n|\r|\n/);
const SECTION_TITLE_REGEX = new RegExp(
  '^(\\[)?(verse|chorus|interlude|prechorus|vamp|tag|outro|intro|break|pre chorus|bridge)( )*([0-9])*(:|])?( )*$',
);

import * as Transposer from 'chord-transposer';

import React from 'react';
import {Text} from 'react-native';

export function hasAnyKeysSet(song) {
  if (!song) return false;
  return song.original_key || song.transposed_key || song.capo?.capo_key;
}

export function getPreferredKey(song) {
  if (song.show_capo && song.capo) {
    return song.capo.capo_key;
  } else if (song.show_transposed && song.transposed_key) {
    return song.transposed_key;
  } else {
    return song.original_key;
  }
}

export function buildContent(song, textStyles) {
  let content = song?.content;
  if (!content || !song?.format) return <Text />;

  if (song.roadmap?.length > 0 && song.show_roadmap)
    content = fromRoadmap(song);

  // if (isChordPro(content)) content = formatChordPro(content);

  if (!song.format.chords_hidden && (song.show_transposed || song.show_capo)) {
    content = transpose({...song, content: content});
  }

  let linesOfSong = content.split(/\r\n|\r|\n/);

  let textLines = linesOfSong.map((line, index) => {
    if (isNewLine(line))
      return (
        <Text
          key={index}
          style={{
            height: song.format.font_size * 1.5,
          }}
        />
      );
    else if (isChordLine(line) && song.format.chords_hidden) {
      return null;
    } else {
      return (
        <Text
          key={index}
          style={[
            getStyles(song.format, line),
            {
              lineHeight: song.format.font_size * 1.5,
            },
            textStyles,
          ]}>
          {line}
        </Text>
      );
    }
  });
  return textLines;
}

function getStyles(format, line) {
  return isChordLine(line) ? getChordStyles(format) : getLyricStyles(format);
}

function getLyricStyles(format) {
  let styles = {
    fontSize: format.font_size,
    fontFamily: FONTS[format.font].regular,
  };
  return styles;
}

function getChordStyles(format) {
  let styles = {fontSize: format.font_size};

  if (format.bold_chords && format.italic_chords)
    styles.fontFamily = FONTS[format.font].boldItalic;
  else if (format.bold_chords) styles.fontFamily = FONTS[format.font].bold;
  else if (format.italic_chords) styles.fontFamily = FONTS[format.font].italic;
  else {
    styles.fontFamily = FONTS[format.font].regular;
  }
  return styles;
}

export function transpose(song) {
  if (
    (song?.original_key && song?.transposed_key && song?.content) ||
    (song?.original_key && song?.capo && song?.content)
  ) {
    let linesOfSong = song.content.split(/\r\n|\r|\n/);

    let transposedContent = '';

    linesOfSong.forEach((line, index) => {
      let transposedLine;
      if (isChordLine(line)) {
        if (song.capo && song.show_capo) {
          if (song.show_transposed && song.transposed_key) {
            transposedLine = Transposer.transpose(line)
              .fromKey(song.original_key)
              .toKey(song.transposed_key)
              .toString();
            transposedLine = Transposer.transpose(transposedLine)
              .fromKey(song.transposed_key)
              .toKey(song.capo.capo_key)
              .toString();
          } else {
            transposedLine = Transposer.transpose(line)
              .fromKey(song.original_key)
              .toKey(song.capo.capo_key)
              .toString();
          }
        } else {
          transposedLine = Transposer.transpose(line)
            .fromKey(song.original_key)
            .toKey(song.transposed_key)
            .toString();
        }

        transposedContent += transposedLine;
      } else {
        transposedContent += line;
      }

      if (index < linesOfSong.length - 1) {
        transposedContent += '\n';
      }
    });

    return transposedContent;
  } else {
    return song?.content ? song.content : '';
  }
}

function fromRoadmap(song) {
  let sections = breakIntoSections(song.content);
  let roadmap = song.roadmap;

  let expandedContent = '';
  let sectionTitles = Object.keys(sections);

  roadmap.forEach(roadmapSection => {
    let matchedSectionTitle = sectionTitles.find(sectionTitle =>
      sectionTitle.includes(roadmapSection),
    );
    if (matchedSectionTitle) {
      let sectionToAppend = `${roadmapSection}\n${sections[matchedSectionTitle]}`;
      if (!sectionToAppend.endsWith('\n\n')) sectionToAppend += '\n';
      expandedContent += sectionToAppend;
    }
  });

  return expandedContent;
}

function breakIntoSections(content = '') {
  let lines = content.split(LINES_REGEX);

  let sectionTitle = '';
  let sections = {};
  lines.forEach(line => {
    if (isSectionTitle(line)) {
      sectionTitle = line;
      sections[sectionTitle] = '';
    } else {
      sections[sectionTitle] += `${line}\n`;
    }
  });

  return sections;
}

function isSectionTitle(line) {
  let lowercasedLine = line.toLowerCase();
  return SECTION_TITLE_REGEX.test(lowercasedLine);
}

export function isChordLine(line) {
  if (line) {
    let parts = line.split(' ');
    parts = parts.map(part => part.replace(/\s/g, ''));
    parts = parts.filter(part => part !== '');
    let numChordMatches = 0;

    parts?.forEach(part => {
      if (isChord(part)) {
        ++numChordMatches;
      }
    });

    return numChordMatches > parts.length / 2;
  } else {
    return false;
  }
}
export function isNewLine(line) {
  return line === '';
}

function isChord(potentialChord) {
  try {
    Transposer.Chord.parse(potentialChord);
    return true;
  } catch {
    return false;
  }
}

export const FONTS = {
  'Roboto Mono': {
    regular: 'RobotoMono-Regular',
    boldItalic: 'RobotoMono-BoldItalic',
    bold: 'RobotoMono-Bold',
    italic: 'RobotoMono-Italic',
  },
  'Open Sans': {
    regular: 'OpenSans-Regular',
    boldItalic: 'OpenSans-BoldItalic',
    bold: 'OpenSans-Bold',
    italic: 'OpenSans-Italic',
  },
};
