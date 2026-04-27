import { Alert } from "react-native";
import axiosInstance from "./axios";

export const registerApi = async (data) => {
    try {
        const response = await axiosInstance.post("/register", data);
        return response.data;
    } catch (error) {
        Alert.alert("Error", "Registration failed");
        throw error;
    }
}

export const verifyApi = async (data) => {
    const response = await axiosInstance.post("/verify-email", data);
    return response.data;
};

export const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post("/login", data);
        return response.data.data;
    } catch (error) {
        Alert.alert("Error", "Login failed");
        throw error;
    }
};

