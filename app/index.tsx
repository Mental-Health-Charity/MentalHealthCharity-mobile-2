import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useUser } from "@/modules/auth/components/AuthContextProvider";

export default function Index() {
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (user) {
        return <Redirect href="/(app)" />;
    }

    return <Redirect href="/welcome-screen" />;
}
