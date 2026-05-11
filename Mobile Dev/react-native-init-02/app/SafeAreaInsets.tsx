import { StatusBar, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  console.log(insets)
  return (
    <View style={{
      flex: 1, backgroundColor: '#bb88ec',
      paddingTop: insets.top,
      paddingBottom: insets.bottom

    }}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
      <Text style={{
        color: 'white'
      }}>Hi there</Text>
    </View>
  );
}

const styles = StyleSheet.create({
})
