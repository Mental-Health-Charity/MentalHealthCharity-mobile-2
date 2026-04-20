import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";
import RegisterForm from "@/modules/auth/components/RegisterForm";
import {useSession} from "@/modules/auth/context/ctx";
import {RegisterFormValues} from "@/modules/auth/types";
import {router} from "expo-router";
import {useToast} from "@/modules/shared/components/Toast";


const RegisterScreen: React.FC = () => {
    const { t } = useTranslation();
    const {register} = useSession();
    const {showToast} = useToast();

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            try {
                await register(values);
                router.replace('/sign-in');
                showToast({type: "success", title: "Sukces", description: "Rejestracja przebiegła pomyślnie", duration: 400});
            } catch (error) {
                console.error("Błąd podczas procesu:", error);
            }
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

            <RegisterForm onSubmit={handleSubmit} />
        </View>
    </View>
    )
}

export default RegisterScreen