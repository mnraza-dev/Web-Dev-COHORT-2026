import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NoteEditor from '../components/NoteEditor';
import NotesList from '../components/NotesList';
import { Colors } from '../constants/theme';

type Screen = 'LIST' | 'EDITOR';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const HomeScreen = () => {
  const systemColorScheme = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(
    systemColorScheme === 'dark'
  );

  const [currentScreen, setCurrentScreen] =
    useState<Screen>('LIST');

  const [editingNote, setEditingNote] =
    useState<Note | undefined>(undefined);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome Note',
      content: 'This is your first note.',
      date: new Date().toDateString(),
    },
  ]);

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);


  const handleNotePress = (note: Note) => {
    setEditingNote(note);
    setCurrentScreen('EDITOR');
  };

  const handleAddNote = () => {
    setEditingNote(undefined);
    setCurrentScreen('EDITOR');
  };

  const handleSave = (noteData: {
    title: string;
    content: string;
  }) => {
    if (editingNote) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
            ...note,
            title: noteData.title,
            content: noteData.content,
          }
          : note
      );

      setNotes(updatedNotes);
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        title: noteData.title,
        content: noteData.content,
        date: new Date().toDateString(),
      };

      setNotes([newNote, ...notes]);
    }

    setCurrentScreen('LIST');
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== id)
    );
  };
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const containerStyle = StyleSheet.compose(
    styles.container,
    {
      backgroundColor: theme.background,
    }
  );

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar
        barStyle={
          isDarkMode
            ? 'light-content'
            : 'dark-content'
        }
      />

      {currentScreen === 'LIST' ? (
        <NotesList
          notes={notes}
          onDeleteNote={handleDeleteNote}
          onNotePress={handleNotePress}
          onAddNote={handleAddNote}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      ) : (
        <NoteEditor
          note={editingNote}
          onSave={handleSave}
          onBack={() => setCurrentScreen('LIST')}
          isDarkMode={isDarkMode}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;