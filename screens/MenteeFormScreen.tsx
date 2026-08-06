import { useState } from "react";
import { View } from "react-native";
import { Href, router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MenteeForm from "@/modules/forms/components/MenteeForm";
import sendFormMutation from "@/modules/forms/queries/sendFormMutation";
import { MenteeFormValues, formTypes } from "@/modules/forms/types";
import { useToast } from "@/modules/shared/components/Toast";
import { useTranslation } from "react-i18next";

const MenteeFormScreen = () => {
    const [step, setStep] = useState(0);
    const { showToast } = useToast();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const sendForm = useMutation({
        mutationFn: sendFormMutation,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["canUserSendForm"],
            });
            showToast({
                type: "success",
                title: t("form.mentee_form.submit_success_title"),
                description: t("form.mentee_form.submit_success_description"),
            });
            router.replace("/(app)/(tabs)/chats" as Href);
        },
    });

    const handleSubmit = (values: MenteeFormValues) => {
        if (!values.contact_preference) {
            showToast({
                type: "error",
                title: t("form.mentee_form.missing_preference_title"),
                description: t(
                    "form.mentee_form.missing_preference_description",
                ),
            });
            return;
        }

        sendForm.mutate({
            fields: {
                age: values.age,
                name: values.name,
                description: values.description,
                contact_preference: values.contact_preference,
                email: values.email,
                phone: values.phone,
                source: values.source,
                contacts: values.contacts.map((value) => ({
                    name: value,
                    value,
                })),
            },
            form_type: formTypes.MENTEE,
        });
    };

    return (
        <View className="flex-1 bg-slate-50 px-4 pt-12">
            <MenteeForm
                isLoading={sendForm.isPending}
                onSubmit={handleSubmit}
                setStep={setStep}
                step={step}
            />
        </View>
    );
};

export default MenteeFormScreen;
