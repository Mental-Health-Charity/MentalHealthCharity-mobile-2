import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { ToastProvider } from "@/modules/shared/components/Toast";
import { UserContextProvider } from "@/modules/auth/components/AuthContextProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/query-core";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
        <QueryClientProvider client={new QueryClient()}>
            <UserContextProvider>
                <ToastProvider>
                    <SafeAreaProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                            <Slot />
                        </GestureHandlerRootView>
                    </SafeAreaProvider>
                </ToastProvider>
            </UserContextProvider>
        </QueryClientProvider>
    );
}
