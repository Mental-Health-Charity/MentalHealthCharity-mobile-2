import { useTranslation } from "react-i18next";
import {Text, View} from "react-native";
import React from "react";
import LoginForm from "@/modules/auth/components/LoginForm";
import {useSession} from "@/modules/auth/context/ctx";


const LoginScreen: React.FC = () => {
    const {login} = useSession();
    const { t } = useTranslation();

    return (
        <View className="flex-1 mt-11 mx-6 ">
            <View className="gap-6 flex-1">
                <View className="gap-2">
                    <Text className="text-2xl font-extrabold">{t("common.login_screen.header")}</Text>
                    <Text className="text-base font-normal">{t("common.login_screen.description")}</Text>
                </View>

                <LoginForm onSubmit={login} />
            </View>
        </View>
    )

}

export default LoginScreen;