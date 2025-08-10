import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { login as loginService } from "../services/accountService";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync('authToken');
            const userId = await SecureStore.getItemAsync('userId');
            if (token && userId) {
                setUser({ token, userId });
            } else if (token) {
                setUser({ token });
            }
            setLoading(false);
        })();
    }, []);


    const login = async(email, password) => {
        const data = await loginService(email, password);
        if (data.token && data.account_id) {
            await SecureStore.setItemAsync('authToken', data.token);
            await SecureStore.setItemAsync('userId', String(data.account_id));
            setUser({ token: data.token, userId: String(data.account_id) });
        } else if (data.token) {
            await SecureStore.setItemAsync('authToken', data.token);
            setUser({ token: data.token });
        }
    };


    const logout = async () => {
        await SecureStore.deleteItemAsync('authToken');
        await SecureStore.deleteItemAsync('userId');
        setUser(null);
    };

    return (
        <AuthContext.Provider value = {{user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};