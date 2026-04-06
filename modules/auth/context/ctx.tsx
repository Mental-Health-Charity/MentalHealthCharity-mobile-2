import React, { createContext, useEffect, useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { registerMutation } from '@/modules/auth/queries/registerMutation';
import { loginMutation } from '@/modules/auth/queries/tokenMutation';
import {
    LoginAccessTokenResponse,
    LoginFormValues,
    RegisterFormValues,
    RegisterResponse,
} from '@/modules/auth/types';

type AuthContextType = {
    token: string | null;
    jwtType: string | null;
    isLoading: boolean;
    login: (data: LoginFormValues) => Promise<LoginAccessTokenResponse>;
    register: (data: RegisterFormValues) => Promise<RegisterResponse>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [jwtType, setJWTType] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSession = async () => {
            const storedToken = await SecureStore.getItemAsync('token');
            const storedJwtType = await SecureStore.getItemAsync('jwt');
            setToken(storedToken);
            setJWTType(storedJwtType);
            setIsLoading(false);
        };
        loadSession();
    }, []);

    const login = async (data: LoginFormValues) => {
        const res = await loginMutation(data);
        await SecureStore.setItemAsync('token', res.access_token);
        await SecureStore.setItemAsync('jwt', res.token_type);
        setToken(res.access_token);
        setJWTType(res.token_type);
        return res;
    };

    const register = async (data: RegisterFormValues) => {
        const res = await registerMutation(data);
        return res;
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('token');
            await SecureStore.deleteItemAsync('jwt');
            setToken(null);
            setJWTType(null);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ token, jwtType, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useSession = () => {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in an <AuthProvider />');
    }
    return value;
};


