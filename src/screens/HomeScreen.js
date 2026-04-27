// HomeScreen.js

import React, { useContext } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    commonStylesheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../context/AuthContext";
import { commonStyles } from "../styles/commonStyles";
export default function HomeScreen() {
    const { logout,user } = useContext(AuthContext);
    console.log(user)
    return (
        <SafeAreaView style={commonStyles.container}>
            <StatusBar barStyle="light-content" />

            <LinearGradient
                colors={["#111827", "#0f172a", "#020617"]}
                style={commonStyles.wrapper}
            >
                <View style={{ alignItems: "center" }}>
                    <View style={commonStyles.logo}>
                        <Icon
                            name="checkmark-done"
                            size={45}
                            color="#00E5A8"
                        />
                    </View>

                    <Text style={commonStyles.title}>Welcome {user?.name}</Text>
                    <Text style={commonStyles.sub}>
                        Login successful
                    </Text>
                </View>

                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={logout}
                >
                    <Text style={commonStyles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

