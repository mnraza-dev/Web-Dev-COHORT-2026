
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        Alert.alert("Success", `Welcome ${email}`);
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: "flex-end" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <View style={styles.card}>
                    <Text style={styles.title}>Login</Text>

                    <TextInput
                        placeholder="Enter Email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        Don’t have an account? Sign Up
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#f0f0f0",
    },

    card: {
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 16,
        elevation: 5,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#222",
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        marginBottom: 15,
        fontSize: 16,
        color: "#000",
    },

    button: {
        backgroundColor: "#4f46e5",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },

    footerText: {
        marginTop: 20,
        textAlign: "center",
        color: "#666",
    },
});