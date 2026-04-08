import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";
import RegisterForm from "@/modules/auth/components/RegisterForm";
import {useSession} from "@/modules/auth/context/ctx";


const RegisterScreen: React.FC = () => {

    const { t } = useTranslation();
    const {register} = useSession()
    return (
        <View className="mt-11 mx-6 gap-6">
            <View className="gap-2">
                <Text className="text-2xl font-extrabold" >{t("common.register_screen.header")}</Text>
                <Text className="text-base font-normal">{t("common.register_screen.description")}</Text>
            </View>
            <RegisterForm onSubmit={register} />
        </View>
    )
}

export default RegisterScreen