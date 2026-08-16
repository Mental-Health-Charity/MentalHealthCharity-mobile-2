import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import React from "react";
import LoginForm from "@/modules/auth/components/LoginForm";
import { LoginFormValues } from "@/modules/auth/types";
import { useToast } from "@/modules/shared/components/Toast";
import { useUser } from "@/modules/auth/components/AuthContextProvider";

const LoginScreen: React.FC = () => {
    const { t } = useTranslation();
    const { login } = useUser();
    const { showToast } = useToast();

    const handleSubmit = async (values: LoginFormValues) => {
        login.mutate(values, {
            onSuccess: () => {},
            onError: (error: unknown) => {
                const message =
                    error && typeof error === "object" && "message" in error
                        ? String(error.message)
                        : t("errors.unknown");
                showToast({
                    type: "error",
                    title: t("errors.fail"),
                    description: message,
                    duration: 4000,
                });
            },
        });
    };

    return (
        <View className="flex-1 mt-11 mx-6">
            <View className="gap-6 flex-1">
                <View className="gap-2">
                    <Text className="text-2xl font-extrabold">
                        {t("common.login_screen.header")}
                    </Text>
                    <Text className="text-base font-normal">
                        {t("common.login_screen.description")}
                    </Text>
                </View>

                <LoginForm onSubmit={handleSubmit} />
            </View>
        </View>
    );
};

export default LoginScreen;
