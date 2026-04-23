import { useTranslation } from "react-i18next";
import {Text, View} from "react-native";
import React from "react";
import LoginForm from "@/modules/auth/components/LoginForm";
import {useSession} from "@/modules/auth/context/ctx";
import {LoginFormValues} from "@/modules/auth/types";
import {useToast} from "@/modules/shared/components/Toast";


const LoginScreen: React.FC = () => {
    const { t } = useTranslation();
    const {login} = useSession();
    const {showToast} = useToast();

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            login(values)
        }catch (error) {
            console.error(error);
            showToast({
                type: "error",
                title: "Błąd",
                description: t("errors.unknown"),
                duration: 4000
            });
        }
    }

    return (
        <View className="flex-1 mt-11 mx-6 ">
            <View className="gap-6 flex-1">
                <View className="gap-2">
                    <Text className="text-2xl font-extrabold">{t("common.login_screen.header")}</Text>
                    <Text className="text-base font-normal">{t("common.login_screen.description")}</Text>
                </View>

                <LoginForm onSubmit={handleSubmit} />
            </View>
        </View>
    )

}

export default LoginScreen;