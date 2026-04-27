// LoginScreen.js (Modern Premium UI)

import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    commonStylesheet,
    SafeAreaView,
    StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { commonStyles } from "../styles/commonStyles";
export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [hide, setHide] = useState(true);

    return (
        <SafeAreaView style={commonStyles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={["#111827", "#0f172a", "#020617"]}
                style={commonStyles.wrapper}
            >
                {/* Top */}
                <View style={commonStyles.top}>
                    <View style={commonStyles.logoBox}>
                        <Icon name="shield-checkmark" size={45} color="#00E5A8" />
                    </View>

                    <Text style={commonStyles.title}>Welcome Back</Text>
                    <Text style={commonStyles.subTitle}>
                        Login to continue your journey
                    </Text>
                </View>

                {/* Form */}
                <View style={commonStyles.form}>
                    {/* Email */}
                    <View style={commonStyles.inputBox}>
                        <Icon name="mail-outline" size={22} color="#94a3b8" />
                        <TextInput
                            placeholder="Enter Email"
                            placeholderTextColor="#64748b"
                            style={commonStyles.input}
                            value={form.email}
                            onChangeText={(text) =>
                                setForm({ ...form, email: text })
                            }
                        />
                    </View>

                    {/* Password */}
                    <View style={commonStyles.inputBox}>
                        <Icon name="lock-closed-outline" size={22} color="#94a3b8" />

                        <TextInput
                            placeholder="Enter Password"
                            placeholderTextColor="#64748b"
                            secureTextEntry={hide}
                            style={commonStyles.input}
                            value={form.password}
                            onChangeText={(text) =>
                                setForm({ ...form, password: text })
                            }
                        />

                        <TouchableOpacity onPress={() => setHide(!hide)}>
                            <Icon
                                name={hide ? "eye-off-outline" : "eye-outline"}
                                size={22}
                                color="#94a3b8"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Forgot */}
                    <TouchableOpacity style={commonStyles.forgot}>
                        <Text style={commonStyles.forgotText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    {/* Button */}
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={() => login(form)}
                    >
                        <Text style={commonStyles.buttonText}>Login</Text>
                        <Icon
                            name="arrow-forward-outline"
                            size={20}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    {/* Bottom */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={commonStyles.bottomText}>
                            Don't have account?{" "}
                            <Text style={commonStyles.signUp}>Register</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

