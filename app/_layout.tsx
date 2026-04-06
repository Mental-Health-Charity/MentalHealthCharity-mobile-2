import { useFonts } from 'expo-font';
import "../global.css"
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from "@/modules/auth/context/ctx";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1}}>
                    <Slot />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </AuthProvider>
    );
}