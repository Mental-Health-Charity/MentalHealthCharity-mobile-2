import React from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";
import ResetPasswordSendEmail from "@/modules/auth/components/ResetPasswordSendEmailForm";
import {useToast} from "@/modules/shared/components/Toast";
import {useMutation} from "@tanstack/react-query";
import {resetPasswordMutation} from "@/modules/auth/queries/resetPasswordSendEmailMutation";
import {router} from "expo-router";
import {ResetPasswordPayload} from "@/modules/auth/types";


const ResetPasswordSendEmailScreen: React.FC = () => {
    const { t } = useTranslation();
    const {showToast} = useToast()

    const { mutate } = useMutation({
        mutationFn: resetPasswordMutation,
        onSuccess() {
            showToast({type: "success", title: t("common.success"), description: t("common.register_screen.register_success"), duration: 400});
            router.replace('/sign-in');
        },
    });

    const handleSubmit = (values: ResetPasswordPayload) => {
        mutate(values);
    };
    return (
        <View className="flex-1 mt-11 mx-6 ">
        <View className="gap-6 flex-1">
            <View className="gap-2">
                <Text className="text-2xl font-extrabold">{t("common.login_screen.header")}</Text>
                <Text className="text-base font-normal">{t("common.login_screen.description")}</Text>
            </View>

            <ResetPasswordSendEmail onSubmit={handleSubmit} />
        </View>
    </View>
    )
}

export default ResetPasswordSendEmailScreen