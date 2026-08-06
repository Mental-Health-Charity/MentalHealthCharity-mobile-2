import type { ComponentProps } from "react";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

type IconName = ComponentProps<typeof Ionicons>["name"];

type TabConfig = {
    name: string;
    labelKey: string;
    activeIcon: IconName;
    inactiveIcon: IconName;
};

const tabs: TabConfig[] = [
    {
        name: "chats",
        labelKey: "navigation.chats",
        activeIcon: "chatbubble",
        inactiveIcon: "chatbubble-outline",
    },
    {
        name: "index",
        labelKey: "navigation.home",
        activeIcon: "home",
        inactiveIcon: "home-outline",
    },
    {
        name: "settings",
        labelKey: "navigation.settings",
        activeIcon: "settings",
        inactiveIcon: "settings-outline",
    },
];

export default function AppTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();

    return (
        <View
            className="bg-white px-5 pt-3"
            style={{
                paddingBottom: Math.max(insets.bottom, 12),
            }}
        >
            <View className="min-h-[108px] flex-row items-center rounded-[28px] border border-zinc-100 bg-white px-2 py-3 shadow-xl">
                {tabs.map((tab) => {
                    const route = state.routes.find(
                        (item) => item.name === tab.name,
                    );

                    if (!route) {
                        return null;
                    }

                    const isFocused =
                        state.routes[state.index]?.key === route.key;

                    const options = descriptors[route.key]?.options;

                    const handlePress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const handleLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityLabel={
                                options?.tabBarAccessibilityLabel
                            }
                            accessibilityState={
                                isFocused
                                    ? {
                                          selected: true,
                                      }
                                    : {}
                            }
                            onPress={handlePress}
                            onLongPress={handleLongPress}
                            className="flex-1 items-center justify-center gap-2 rounded-2xl py-2 active:opacity-60"
                        >
                            <Ionicons
                                name={
                                    isFocused
                                        ? tab.activeIcon
                                        : tab.inactiveIcon
                                }
                                size={32}
                                color={isFocused ? "#08B6AA" : "#D1D5DB"}
                            />

                            <Text
                                className={
                                    isFocused
                                        ? "text-base font-bold text-zinc-900"
                                        : "text-base font-normal text-zinc-500"
                                }
                            >
                                {t(tab.labelKey)}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
