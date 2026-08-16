import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/modules/auth/components/AuthContextProvider";
import { canUserSendFormQuery } from "@/modules/forms/queries/canUserSendFormQuery";
import { formTypes } from "@/modules/forms/types";
import { Roles } from "@/modules/users/constants";

export default function ProtectedLayout() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const segments = useSegments();

    const isRoleUser = user?.user_role === Roles.USER;

    const menteeAvailability = useQuery({
        ...canUserSendFormQuery({ form_type: formTypes.MENTEE }),
        enabled: isRoleUser,
    });

    const volunteerAvailability = useQuery({
        ...canUserSendFormQuery({ form_type: formTypes.VOLUNTEER }),
        enabled: isRoleUser,
    });

    const canSendMentee = menteeAvailability.data?.can_send_form ?? false;
    const canSendVolunteer = volunteerAvailability.data?.can_send_form ?? false;
    const isCheckingForm =
        isRoleUser &&
        (menteeAvailability.isLoading || volunteerAvailability.isLoading);

    useEffect(() => {
        if (isLoading || isCheckingForm) return;

        const inProtectedGroup = segments[0] === "(app)";

        if (!user && inProtectedGroup) {
            router.replace("/welcome-screen");
            return;
        }

        const currentRoute = segments[1];
        const alreadyOnForm =
            currentRoute === "mentee-form" || currentRoute === "volunteer-form";

        if (
            user?.user_role === Roles.USER &&
            inProtectedGroup &&
            !alreadyOnForm
        ) {
            if (canSendMentee && canSendVolunteer) {
                router.replace("/pick-role");
            } else if (canSendMentee) {
                router.replace("/mentee-form");
            } else if (canSendVolunteer) {
                router.replace("/volunteer-form");
            }
        }
    }, [
        user,
        isLoading,
        isCheckingForm,
        canSendMentee,
        canSendVolunteer,
        segments,
        router,
    ]);

    if (isLoading) {
        return null;
    }

    if (isCheckingForm) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50">
                <ActivityIndicator size="large" color="#06B7A7" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

export const unstable_settings = {
    initialRouteName: "(tabs)",
};
