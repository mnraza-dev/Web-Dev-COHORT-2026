import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems:
          "center",
        justifyContent: "center",
        gap: 12
      }}
    >
      <Text
        numberOfLines={2}>
        lorem ipsum dolor sit amet
      </Text>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        style={{
          width: 80,
          height: 80
        }}
      />
      <TextInput
        placeholder="Type here..."
        placeholderTextColor="gray"
        style={{
          borderWidth: 2,
          borderRadius: 8,
          borderColor: "blue",
          width: 280,
          padding: 12,
          fontSize: 22
        }} />

      <Pressable
        onLongPress={() => {
          alert("Button Long Pressed!");
        }}
        onPressIn={() => {
          console.log("Button Pressed In");
        }}
        onPressOut={() => {
          console.log("Button Pressed Out");
        }}
        onPress={() => {
          alert("Button Pressed!");
        }}

        hitSlop={{
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        }}

        style={({ pressed }) => ({
          backgroundColor: pressed ? "lightblue" : "blue",
          padding: 12,
          borderRadius: 8
        })}
      >
        {({ pressed }) => (
          <Text style={{ color: "white", fontSize: 18 }}>
            {pressed ? "Pressed!" : "Press Me"}
          </Text>
        )}
      </Pressable>


    </View>
  );
}
