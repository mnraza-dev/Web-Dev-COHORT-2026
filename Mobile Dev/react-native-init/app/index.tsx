import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  const items = Array.from({ length: 120 }, (_, i) => `Item ${i + 1}`);

  return (
    <ScrollView>
      <Text>Home Screen</Text>
      {
        items.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))
      }
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

})