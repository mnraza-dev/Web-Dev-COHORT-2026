import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  const items = Array.from({ length: 120 }, (_, i) => `Item ${i + 1}`);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        alignItems: 'center',
      }}
      style={styles.container}>
      <Text>Home Screen</Text>
      {
        items.map((item, index) => (
          <Text style={styles.item} key={index}>{item}</Text>
        ))
      }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  item: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    width: '100%',

  }
})