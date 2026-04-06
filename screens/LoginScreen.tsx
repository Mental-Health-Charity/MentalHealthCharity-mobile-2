import { useTranslation } from "react-i18next";
import {Text, View} from "react-native";
import React, {ReactNode} from "react";
import LoginForm from "@/modules/auth/components/LoginForm";
import {useSession} from "@/modules/auth/context/ctx";
import AuthScreenNavigation from "@/modules/auth/components/AuthScreenNavigation";




const LoginScreen: React.FC = () => {
    const {login} = useSession();
    const { t } = useTranslation();

    return (
        <View className="mt-11 mx-6 gap-6">
            <View className="gap-2">
                <Text className="text-2xl font-extrabold">{t("common.login_screen.header")}</Text>
                <Text className="text-base font-normal">{t("common.login_screen.description")}</Text>
            </View>
            <LoginForm onSubmit={login} />
        </View>
    )

}

export default LoginScreen;