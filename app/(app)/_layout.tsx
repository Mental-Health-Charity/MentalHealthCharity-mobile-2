import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useUser } from "@/modules/auth/components/AuthContextProvider";

export default function ProtectedLayout() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (isLoading) return;

        const inProtectedGroup = segments[0] === "(app)";

        if (!user && inProtectedGroup) {
            router.replace("/welcome-screen");
        }
    }, [user, isLoading, segments, router]);

    if (isLoading) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}
