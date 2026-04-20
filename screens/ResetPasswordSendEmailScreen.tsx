import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";
import ResetPasswordSendEmail from "@/modules/auth/components/ResetPasswordSendEmailForm";
import {useSession} from "@/modules/auth/context/ctx";
import {useToast} from "@/modules/shared/components/Toast";
import {ResetPasswordEmailValues} from "@/modules/auth/types";


const ResetPasswordSendEmailScreen: React.FC = () => {
    const { t } = useTranslation();
    const {resetPasswordSendEmail} = useSession()
    const {showToast} = useToast()

    const handleResetPasswordSendEmail = async (values: ResetPasswordEmailValues) => {
        try {
            await resetPasswordSendEmail(values);
            showToast({
                type: "success",
                title: t("common.reset_password_screen.title"),
                description: t("common.reset_password_screen.toast_description"),
                duration: 4000
            });
        } catch (error) {
            console.error("Reset password error:", error);
            showToast({
                type: "error",
                title: t("errors.fail"),
                description: t("errors.unknown"),
                duration: 4000
            });
        }
    };
    return (
        <View className="flex-1 mt-11 mx-6 ">
        <View className="gap-6 flex-1">
            <View className="gap-2">
                <Text className="text-2xl font-extrabold">{t("common.login_screen.header")}</Text>
                <Text className="text-base font-normal">{t("common.login_screen.description")}</Text>
            </View>

            <ResetPasswordSendEmail onSubmit={handleResetPasswordSendEmail} />
        </View>
    </View>
    )
}

export default ResetPasswordSendEmailScreen