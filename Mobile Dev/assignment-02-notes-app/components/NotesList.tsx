import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Colors, Spacing, Typography } from '../constants/theme';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface NotesListProps {
  notes: Note[];
  onNotePress: (note: Note) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const NotesList = ({
  notes,
  onNotePress,
  onAddNote,
  onDeleteNote,
  isDarkMode,
  setIsDarkMode,
}: NotesListProps) => {
  const [search, setSearch] = useState('');
  const { width } = useWindowDimensions();

  const theme = isDarkMode ? Colors.dark : Colors.light;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  const numColumns = width > 600 ? 2 : 1;

  const renderNote = ({ item }: { item: Note }) => (
    <Pressable
      style={({ pressed }) => [
        styles.noteCard,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          width: width > 600 ? (width - 64) / 2 : '100%',
        },
        pressed && styles.pressed,
      ]}
      onPress={() => onNotePress(item)}
    >
      <Text style={[styles.noteTitle, { color: theme.text }]}>
        {item.title}
      </Text>

      <Text
        style={[styles.noteSnippet, { color: theme.textSecondary }]}
        numberOfLines={2}
      >
        {item.content}
      </Text>

      <Text style={[styles.noteDate, { color: theme.textSecondary }]}>
        {item.date}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          My Notes
        </Text>

        <TouchableOpacity
          onPress={() => setIsDarkMode(!isDarkMode)}
          style={[
            styles.themeButton,
            { backgroundColor: theme.card },
          ]}
        >
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={24}
            color="#FF9500"
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.surface,
            color: theme.text,
            borderColor: theme.border,
          },
        ]}
        placeholder="Search notes..."
        placeholderTextColor={theme.textSecondary}
        value={search}
        onChangeText={setSearch}
      />

      {/* NOTES */}
      {/* <FlatList
        data={filteredNotes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={numColumns}
        key={numColumns}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons
              name="document-text-outline"
              size={60}
              color="#FF9500"
            />

            <Text
              style={{
                color: theme.textSecondary,
                marginTop: 12,
                fontSize: 16,
              }}
            >
              No notes found
            </Text>
          </View>
        }
      /> */}

      <SwipeListView
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        rightOpenValue={-90}
        disableRightSwipe

        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.noteCard,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                width: width > 600 ? (width - 64) / 2 : '100%',
              },
              pressed && styles.pressed,
            ]}
            onPress={() => onNotePress(item)}
          >
            <Text style={[styles.noteTitle, { color: theme.text }]}>
              {item.title}
            </Text>

            <Text
              style={[
                styles.noteSnippet,
                { color: theme.textSecondary },
              ]}
              numberOfLines={2}
            >
              {item.content}
            </Text>

            <Text
              style={[
                styles.noteDate,
                { color: theme.textSecondary },
              ]}
            >
              {item.date}
            </Text>
          </Pressable>
        )}

        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDeleteNote(item.id)}
            >
              <Ionicons
                name="trash"
                size={26}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* FAB */}
      <Pressable
        style={styles.fab}
        onPress={onAddNote}
      >
        <Ionicons
          name="add"
          size={30}
          color="#fff"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },

  title: {
    ...Typography.h1,
  },

  themeButton: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchInput: {
    height: 50,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    marginBottom: Spacing.md,
    ...Typography.body,
  },

  listContent: {
    paddingBottom: 120,
  },

  noteCard: {
    padding: Spacing.md,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: Spacing.md,
    marginRight: Spacing.sm,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  noteTitle: {
    ...Typography.h2,
    marginBottom: 6,
  },

  noteSnippet: {
    ...Typography.body,
    marginBottom: 10,
    lineHeight: 22,
  },

  noteDate: {
    ...Typography.caption,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,

    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#FF9500',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 8,

    shadowColor: '#FF9500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },

  deleteButton: {
    width: 80,
    height: '88%',
    borderRadius: 18,
    backgroundColor: '#ff3b30',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotesList;