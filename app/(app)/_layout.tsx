import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useSession } from '@/modules/auth/context/ctx';

export default function ProtectedLayout() {
    const { token, isLoading } = useSession();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (isLoading) return;

        const inProtectedGroup = segments[0] === '(app)';

        if (!token && inProtectedGroup) {
            router.replace('/welcome-screen');
        }
    }, [token, isLoading, segments]);

    if (isLoading) {
        return null; // or a loading spinner
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
        </Stack>
    );
}