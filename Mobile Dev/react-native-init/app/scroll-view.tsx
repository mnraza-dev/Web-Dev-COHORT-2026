import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Switch, Text } from 'react-native';

const HomeScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const items = Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`);
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
      <Button
        title="Go to Details"
        onPress={() => { alert('Going to details...') }}
        color="#08722f"
      />

      <Switch
        value={isDarkMode}
        onValueChange={setIsDarkMode}
        trackColor={{ false: "#4f0996", true: "#051735" }}
        thumbColor={isDarkMode ? "#f3f3f3" : "#661166"}
      />
    </ScrollView>
  )
}
export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    height: 60,
    width: '100%',
  }
})