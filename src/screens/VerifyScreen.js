// VerifyScreen.js

import React, { useContext, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import OTPTextView from "react-native-otp-textinput";
import Icon from "react-native-vector-icons/Ionicons";
import { verifyApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

export default function VerifyScreen({ route, navigation }) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUserAndToken } = useContext(AuthContext);

    const submit = async () => {
        if (otp.length !== 6) {
            return Alert.alert("Invalid OTP", "Enter 6 digit code");
        }

        try {
            setLoading(true);

            const res = await verifyApi({
                email: route.params.email,
                otp,
            });
            console.log(res);
            if (res.success) {
                setUserAndToken(res.data.user, res.data.token);
                Alert.alert("Success", "Email Verified");
                navigation.replace("Login");
            }
            navigation.replace("Login");
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={["#111827", "#0f172a", "#020617"]}
                style={styles.wrapper}
            >
                {/* Top */}
                <View style={styles.top}>
                    <View style={styles.iconBox}>
                        <Icon
                            name="mail-open-outline"
                            size={42}
                            color="#00E5A8"
                        />
                    </View>

                    <Text style={styles.title}>Verify Email</Text>

                    <Text style={styles.sub}>
                        We sent verification code to
                    </Text>

                    <Text style={styles.email}>
                        {route.params.email}
                    </Text>
                </View>

                {/* OTP */}
                <View style={styles.middle}>
                    <OTPTextView
                        handleTextChange={(text) => setOtp(text)}
                        inputCount={6}
                        tintColor="#00E5A8"
                        offTintColor="rgba(255,255,255,0.08)"
                        textInputStyle={styles.otpBox}
                    />

                    <TouchableOpacity>
                        <Text style={styles.resend}>
                            Resend Code
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={submit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? "Verifying..." : "Verify Account"}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
        paddingBottom: 35,

    },
    top: {
        marginTop: 70,
        alignItems: "center",
    },
    iconBox: {
        width: 95,
        height: 95,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.05)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "800",
    },
    sub: {
        color: "#94a3b8",
        fontSize: 14,
        marginTop: 8,
    },
    email: {
        color: "#00E5A8",
        marginTop: 8,
        fontWeight: "700",
        fontSize: 15,
    },
    middle: {
        alignItems: "center",
    },
    otpBox: {
        width: 48,
        height: 58,
        borderRadius: 16,
        borderWidth: 1,
        color: "#fff",
        fontSize: 22,
        backgroundColor: "rgba(255,255,255,0.04)",
    },
    resend: {
        color: "#00E5A8",
        marginTop: 28,
        fontSize: 14,
        fontWeight: "600",
    },
    button: {
        height: 58,
        borderRadius: 18,
        backgroundColor: "#00E5A8",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
});