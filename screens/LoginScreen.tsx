import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import React, { useState } from "react";
import LoginForm from "@/modules/auth/components/LoginForm";
import { LoginFormValues } from "@/modules/auth/types";
import { useToast } from "@/modules/shared/components/Toast";
import { useUser } from "@/modules/auth/components/AuthContextProvider";

const LoginScreen: React.FC = () => {
    const { t } = useTranslation();
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (values: LoginFormValues) => {
        setLoading(true);
        login.mutate(values, {
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
                showToast({
                    type: "error",
                    title: t("errors.fail"),
                    description: t("errors.unknown"),
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
