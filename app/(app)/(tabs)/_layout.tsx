import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <NativeTabs>
            <NativeTabs.Trigger name="chats">
                <NativeTabs.Trigger.Icon sf="message.fill" md="chat" />
                <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
                <NativeTabs.Trigger.Label>
                    {t("navigation.chats")}
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="index">
                <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
                <NativeTabs.Trigger.Label>
                    {t("navigation.home")}
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>

            <NativeTabs.Trigger name="settings">
                <NativeTabs.Trigger.Icon sf="gearshape.fill" md="settings" />
                <NativeTabs.Trigger.Label>
                    {t("navigation.options")}
                </NativeTabs.Trigger.Label>
            </NativeTabs.Trigger>
        </NativeTabs>
    );
}
