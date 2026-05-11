import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

interface NoteEditorProps {
  note?: {
    title: string;
    content: string;
  };
  onSave: (note: { title: string; content: string }) => void;
  onBack: () => void;
  isDarkMode: boolean;
}

const NoteEditor = ({ note, onSave, onBack, isDarkMode }: NoteEditorProps) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <ImageBackground
          source={require('../assets/images/note_header_bg.png')}
          style={styles.headerBackground}
        >
          <View style={styles.headerOverlay}>
            <View style={styles.headerActions}>
              <Pressable style={styles.headerButton} onPress={onBack}>
                <Text style={styles.headerButtonText}>← Back</Text>
              </Pressable>
              <Pressable
                style={[styles.headerButton, styles.saveButton]}
                onPress={() => onSave({ title, content })}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
            <Text style={styles.headerTitle}>{note ? 'Edit Note' : 'New Note'}</Text>
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <TextInput
            style={[styles.titleInput, { color: theme.text }]}
            placeholder="Title"
            placeholderTextColor={theme.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
          <View style={[styles.separator, { backgroundColor: theme.border }]} />
          <TextInput
            style={[styles.bodyInput, { color: theme.text }]}
            placeholder="Start writing..."
            placeholderTextColor={theme.textSecondary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    height: 200,
    width: '100%',
  },
  headerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  headerButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '700',
  },
  headerTitle: {
    ...Typography.h1,
    color: 'white',
    marginBottom: Spacing.sm,
  },
  contentContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  separator: {
    height: 1,
    marginBottom: Spacing.md,
  },
  bodyInput: {
    flex: 1,
    fontSize: 18,
    lineHeight: 26,
    paddingBottom: 100,
  },
});

export default NoteEditor;
