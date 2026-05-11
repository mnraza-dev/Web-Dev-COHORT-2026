import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [focusedInput, setFocusedInput] = useState("");

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: "flex-end" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>

                <View style={styles.logoContainer}>
                    <View style={styles.logoRow}>
                        <View style={styles.logoDot} />
                        <View style={styles.logoDot} />
                    </View>

                    <View style={styles.logoRow}>
                        <View style={styles.logoDot} />
                        <View style={styles.logoDot} />
                    </View>
                </View>

                <Text style={styles.title}>Sign In</Text>

                <Text style={styles.subtitle}>
                    Let’s experience the joy of telecare AI.
                </Text>

                {/* Email */}
                <Text style={styles.label}>Email Address</Text>

                <View style={[
                    styles.inputWrapper,
                    focusedInput === "email" &&
                    styles.activeInput,
                ]}>
                    <Ionicons name="mail-outline" size={20} color="#555" />

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        style={styles.input}
                        placeholderTextColor="#888"
                        onFocus={() => setFocusedInput("email")}
                    />

                    <TouchableOpacity>
                        <Ionicons name="hand-left-outline" size={22} color="#222" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Password</Text>

                <View style={[
                    styles.inputWrapper,
                    focusedInput === "password" &&
                    styles.activeInput,
                ]}>
                    <Ionicons name="lock-closed-outline" size={20} color="#555" />

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password..."
                        secureTextEntry={!isPasswordVisible}
                        style={styles.input}
                        placeholderTextColor="#888"
                        onFocus={() => setFocusedInput("password")}

                    />

                    <TouchableOpacity onPress={() =>
                        setIsPasswordVisible(!isPasswordVisible)
                    }>
                        {
                            isPasswordVisible ? (
                                <Ionicons name="eye-outline" size={22} color="#bbb" />
                            ) : (
                                <Ionicons name="eye-off-outline" size={22} color="#bbb" />
                            )
                        }
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign In</Text>

                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialBtn}>
                        <FontAwesome name="facebook" size={24} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialBtn}>
                        <FontAwesome name="google" size={24} color="#333" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialBtn}>
                        <FontAwesome name="instagram" size={24} color="#333" />
                    </TouchableOpacity>
                </View>


                <Text style={styles.footer}>
                    Don’t have an account?{" "}

                    <Text
                        style={styles.link}
                        onPress={() => router.push("/signup")}
                    >
                        Sign Up.
                    </Text>
                </Text>

                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const GREEN = "#8CD313";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingHorizontal: 28,
        paddingTop: 20,
    },

    logoContainer: {
        alignSelf: "center",
        marginBottom: 25,
    },

    logoRow: {
        flexDirection: "row",
        justifyContent: "center",
    },

    logoDot: {
        width: 18,
        height: 18,
        backgroundColor: GREEN,
        borderRadius: 7,
        margin: 3,
    },

    title: {
        fontSize: 46,
        fontWeight: "800",
        color: "#222",
        textAlign: "center",
    },

    subtitle: {
        textAlign: "center",
        color: "#777",
        fontSize: 16,
        marginTop: 12,
        marginBottom: 40,
        lineHeight: 24,
    },

    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
        marginBottom: 12,
        marginLeft: 3,
    },

    inputWrapper: {
        height: 66,
        backgroundColor: "#fff",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        marginBottom: 26,

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 10,

        elevation: 2,
    },

    activeInput: {
        borderWidth: 2,
        borderColor: "#B8E35A",
    },

    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: "#222",
    },

    button: {
        height: 66,
        backgroundColor: GREEN,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "700",
        marginRight: 10,
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 48,
    },

    socialBtn: {
        width: 66,
        height: 66,
        borderRadius: 22,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 10,

        elevation: 2,
    },

    footer: {
        textAlign: "center",
        marginTop: 40,
        fontSize: 15,
        color: "#555",
    },

    link: {
        color: GREEN,
        fontWeight: "700",
    },

    forgot: {
        textAlign: "center",
        color: GREEN,
        marginTop: 14,
        fontSize: 15,
        fontWeight: "600",
    },
});