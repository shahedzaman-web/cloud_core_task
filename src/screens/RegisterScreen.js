// RegisterScreen.js

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { registerApi } from "../api/authApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../styles/commonStyles";
export default function RegisterScreen({ navigation }) {
    const [hide, setHide] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const submit = async () => {
        try {
            await registerApi(form);

            navigation.navigate("Verify", {
                email: form.email,
            });
        } catch (error) {
            Alert.alert("Error", "Registration failed");
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={["#111827", "#0f172a", "#020617"]}
                style={commonStyles.wrapper}
            >
                <View style={commonStyles.top}>
                    <View style={commonStyles.logoBox}>
                        <Icon name="shield-checkmark" size={45} color="#00E5A8" />
                    </View>
                    <View style={commonStyles.titleBox}>
                        <Text style={commonStyles.title}>Create Account</Text>
                        <Text style={commonStyles.subTitle}>
                            Register and start using app
                        </Text>
                    </View>

                    <View style={commonStyles.inputBox}>
                        <Icon name="person-outline" size={20} color="#94a3b8" />
                        <TextInput
                            placeholder="Full Name"
                            placeholderTextColor="#64748b"
                            style={commonStyles.input}
                            onChangeText={(t) =>
                                setForm({ ...form, name: t })
                            }
                        />
                    </View>

                    <View style={commonStyles.inputBox}>
                        <Icon name="mail-outline" size={20} color="#94a3b8" />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#64748b"
                            style={commonStyles.input}
                            onChangeText={(t) =>
                                setForm({ ...form, email: t })
                            }
                        />
                    </View>

                    <View style={commonStyles.inputBox}>
                        <Icon name="lock-closed-outline" size={20} color="#94a3b8" />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#64748b"
                            secureTextEntry={hide}
                            style={commonStyles.input}
                            onChangeText={(t) =>
                                setForm({ ...form, password: t })
                            }
                        />
                        <TouchableOpacity onPress={() => setHide(!hide)}>
                            <Icon
                                name={hide ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={submit}
                    >
                        <Text style={commonStyles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={commonStyles.bottom}>
                            Already have account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

