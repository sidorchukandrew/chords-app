import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Container from './Container';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DashboardWidget({
  children,
  title,
  headerActionText,
  onHeaderActionPress,
  style: providedStyles,
}) {
  return (
    <Container size="lg">
      <View style={[styles.widgetContainer, providedStyles]}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
          {headerActionText && (
            <TouchableOpacity onPress={onHeaderActionPress}>
              <Text style={styles.headerActionText}>{headerActionText}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  widgetContainer: {
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.32,

    elevation: 2,
    marginBottom: 15,
  },
  titleContainer: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    padding: 20,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '500',
  },
  headerActionText: {
    fontWeight: '500',
    color: '#2464eb',
  },
  contentContainer: {
    padding: 20,
  },
});
