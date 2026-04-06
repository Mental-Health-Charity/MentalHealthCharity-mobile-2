import { Redirect } from "expo-router";
import { useSession } from "@/modules/auth/context/ctx";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const { token, isLoading } = useSession();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (token) {
        return <Redirect href="/(app)" />;
    }

    return <Redirect href="/welcome-screen" />;
}