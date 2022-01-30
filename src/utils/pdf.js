import * as Transposer from 'chord-transposer';
import {isChordLine, isNewLine, transpose} from './song';

const CHORD_PRO_REGEX = new RegExp(/[[].*[\]]/);
const LINES_REGEX = new RegExp(/\r\n|\r|\n/);
const SECTION_TITLE_REGEX = new RegExp(
  '^(\\[)?(verse|chorus|interlude|prechorus|vamp|tag|outro|intro|break|pre chorus|bridge)( )*([0-9])*(:|])?( )*$',
);

export function buildPdfContent(song, {withPadding}) {
  let content = song?.content;
  if (!content || !song?.format) return '<p></p>';

  if (song.roadmap?.length > 0 && song.show_roadmap)
    content = fromRoadmap(song);

  // if (isChordPro(content)) content = formatChordPro(content);

  if (!song.format.chords_hidden && (song.show_transposed || song.show_capo)) {
    content = transpose({...song, content: content});
  }

  let linesOfSong = content.split(/\r\n|\r|\n/);

  let textLines = linesOfSong.map((line, index) => {
    if (isNewLine(line)) return '<p></p>';
    else if (isChordLine(line) && song.format.chords_hidden) {
      return '';
    } else {
      return `<p style="color: black; white-space: pre; line-height: .3; ${getStyles(
        song.format,
        line,
      )}">${line}</p>\n`;
    }
  });

  return `
    <html>
      <body>
        ${generateTitle(song)}
        <div>${textLines.join('')}</div>
      </body>
    </html>
  `;
}

function getStyles(format, line) {
  return isChordLine(line) ? getChordStyles(format) : getLyricStyles(format);
}

function getLyricStyles(format) {
  let styles = ` font-size: ${format.font_size};`;
  return styles;
}

function getChordStyles(format) {
  let styles = ` font-size: ${format.font_size};`;

  if (format.bold_chords) styles += ' font-weight: 600;';
  if (format.italic_chords) styles += ' font-style: italic;';
  return styles;
}

function isChordPro(content) {
  return CHORD_PRO_REGEX.test(content);
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

function generateTitle(song) {
  return `<h1 style="padding-bottom: 20">${song.name}</h1>`;
}
