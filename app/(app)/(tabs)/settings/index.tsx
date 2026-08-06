import { ReactElement } from "react";
import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useUser } from "@/modules/auth/components/AuthContextProvider";
import CustomButton from "@/modules/shared/components/Button";

export default function Settings(): ReactElement {
    const { t } = useTranslation();
    const { logout } = useUser();

    return (
        <View className="flex-1 bg-white px-4 py-6">
            <Text className="mb-6 text-2xl font-bold text-slate-900">
                {t("settings.title")}
            </Text>

            <CustomButton
                title="settings.logout"
                variant="error"
                width="full"
                onPress={() => {
                    void logout();
                }}
            />
        </View>
    );
}
