

import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#020617",
    },
    wrapper: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
    },
    top: {
        marginTop: 60,
        alignItems: "center",
        paddingBottom: 30,
    },
    title: {
        fontSize: 34,
        color: "#fff",
        fontWeight: "800",
    }, titleBox: {
        marginBottom: 40,
        alignItems: "center",
    }, logoBox: {
        width: 95,
        height: 95,
        borderRadius: 6,
        backgroundColor: "rgba(255,255,255,0.05)",
        justifyContent: "center",
        alignItems: "center", justifyContent: "center",

    },
    subTitle: {
        color: "#94a3b8",
        marginTop: 8,
        fontSize: 14,
    },
    inputBox: {
        height: 58,
        borderRadius: 6,
        backgroundColor: "rgba(255,255,255,0.05)",
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        color: "#fff",
    },
    inputOtp: {
        height: 58,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.05)",
        paddingHorizontal: 18,
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
        letterSpacing: 8,
        marginBottom: 18,
    },
    button: {
        height: 58,
        borderRadius: 6,
        backgroundColor: "#00E5A8",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        flexDirection: "row",
        gap: 8,
        width: "100%",
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 16,
    },
    bottom: {
        textAlign: "center",
        color: "#00E5A8",
        marginTop: 16,
    },
    logo: {
        width: 95,
        height: 95,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.05)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
    },
});