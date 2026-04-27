import React, { createContext, useEffect, useState } from "react";
import { loginApi } from "../api/authApi";
import storage from "../utils/mmkvConfig";
import { Alert } from "react-native";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLogged, setIsLogged] = useState(false);
    const login = async (data) => {
        try {
            const res = await loginApi(data);
            setUser(res.user);
            setIsLogged(true);
            storage.set("token", res.accessToken);
            storage.set('user', JSON.stringify(res.user))
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        setIsLogged(false);
        storage.removeItem("token");
    };

    useEffect(() => {
        const checkIfTokenExit = async () => {
            const token = storage.getString("token");
            const userData = storage.getString("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }
            if (token) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        }
        checkIfTokenExit();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLogged,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};  