import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const quickActions = [
    { id: 1, icon: "leaf-outline" as const, label: "breathing", color: "#06B7A7" },
    { id: 2, icon: "book-outline" as const, label: "journaling", color: "#8B5CF6" },
    { id: 3, icon: "happy-outline" as const, label: "mood_tracker", color: "#F59E0B" },
    { id: 4, icon: "chatbubbles-outline" as const, label: "get_help", color: "#EC4899" },
];

const dailyQuote = {
    text: "Nie ma nikogo, kto by był owocem, kwiatem, liściem lub gałęzią nas samych i to jest godne podziwu.",
    author: "Marek Hłasko"
};

interface MainScreenProps {
    userName?: string;
}

export default function MainScreen({ userName = "Anna" }: MainScreenProps) {
    const { t } = useTranslation();

    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="bg-primary pt-12 pb-6 px-5 rounded-b-3xl">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-2">
                            <Image 
                                source={require("@/assets/images/Group 78.png")}
                                className="w-8 h-8"
                            />
                            <Text className="text-white text-xl font-bold">Be Mindful</Text>
                        </View>
                        <TouchableOpacity className="p-2">
                            <Ionicons name="notifications-outline" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-5 pt-6">
                    <Text className="text-2xl font-bold text-gray-900">
                        {t("common.main_screen.hello", { name: userName })}
                    </Text>
                    <Text className="text-gray-500 mt-1">
                        {t("common.main_screen.subtitle")}
                    </Text>
                </View>

                <View className="px-5 pt-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-4">
                        {t("common.main_screen.quick_actions")}
                    </Text>
                    <View className="flex-row flex-wrap justify-between">
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                className="w-[48%] bg-gray-50 rounded-2xl p-4 mb-4 items-center"
                            >
                                <View 
                                    className="w-14 h-14 rounded-full items-center justify-center mb-3"
                                    style={{ backgroundColor: `${action.color}20` }}
                                >
                                    <Ionicons 
                                        name={action.icon} 
                                        size={28} 
                                        color={action.color} 
                                    />
                                </View>
                                <Text className="text-sm font-medium text-gray-800 text-center">
                                    {t(`common.main_screen.${action.label}`)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View className="px-5 pt-4 pb-6">
                    <View className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-5">
                        <View className="flex-row items-center gap-2 mb-2">
                            <Ionicons name="chatbubble-ellipses" size={20} color="#06B7A7" />
                            <Text className="text-sm font-medium text-primary">
                                {t("common.main_screen.daily_quote")}
                            </Text>
                        </View>
                        <Text className="text-gray-700 text-base leading-relaxed italic">
                            "{dailyQuote.text}"
                        </Text>
                        <Text className="text-gray-500 text-sm mt-2">
                            — {dailyQuote.author}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View className="bg-white border-t border-gray-200 px-6 py-3 flex-row justify-around">
                <TouchableOpacity className="items-center">
                    <Ionicons name="home" size={24} color="#06B7A7" />
                    <Text className="text-xs text-primary mt-1 font-medium">
                        {t("common.navigation.home")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <Ionicons name="chatbubbles-outline" size={24} color="#6B7280" />
                    <Text className="text-xs text-gray-500 mt-1">
                        {t("common.navigation.chat")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <Ionicons name="document-text-outline" size={24} color="#6B7280" />
                    <Text className="text-xs text-gray-500 mt-1">
                        {t("common.navigation.articles")}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="items-center">
                    <Ionicons name="settings-outline" size={24} color="#6B7280" />
                    <Text className="text-xs text-gray-500 mt-1">
                        {t("common.navigation.my_account")}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
