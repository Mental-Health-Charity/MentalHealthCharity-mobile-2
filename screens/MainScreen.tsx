import AppBackground from "@/modules/shared/components/App-Background";
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useUser } from "@/modules/auth/components/AuthContextProvider";
import CustomButton from "@/modules/shared/components/Button";
import { router } from "expo-router";
import { ArticleStatus } from "@/modules/articles/constants";
import ArticleCard from "@/modules/articles/components/ArticleCard";
import ArticleStatusesList from "@/modules/articles/components/ArticlesStatusesList";
import { Roles } from "@/modules/users/constants";
import { useArticles } from "@/modules/articles/hooks/useArticles";

const MainScreen = () => {
    const { user } = useUser();
    const { t } = useTranslation();
    const { status, filteredAndSortedArticles, isLoading, handleStatusChange } =
        useArticles();
    const statuses = [
        {
            key: ArticleStatus.DRAFT,
            title: t(".article_status"),
        },
        { key: ArticleStatus.REJECTED, title: t("article_status.rejected") },
        { key: ArticleStatus.CORRECTED, title: t("article_status.corrected") },
        { key: ArticleStatus.SENT, title: t("article_status.sent") },
        { key: ArticleStatus.PUBLISHED, title: t("article_status.published") },
        { key: ArticleStatus.DELETED, title: t("article_status.deleted") },
    ];
    const hasAccessToStatuses =
        user?.user_role === Roles.REDACTOR ||
        user?.user_role === Roles.ADMIN ||
        user?.user_role === Roles.VOLUNTEERSUPERVISOR;
    const hasAssignedChat = Boolean(user?.is_assigned_to_chat);

    return (
        <AppBackground>
            <View className="px-4 pb-3 pt-4">
                <View className="gap-4 rounded-lg bg-white/95 p-4">
                    <View className="gap-1">
                        <Text className="text-sm font-medium text-slate-500">
                            {t("common.login_screen.header")}
                        </Text>
                        <Text
                            className="text-2xl font-bold leading-8 text-slate-900"
                            numberOfLines={2}
                        >
                            {user?.full_name}
                        </Text>
                    </View>

                    <CustomButton
                        title={
                            hasAssignedChat
                                ? "user.chat_with.volunteer"
                                : "user.wait_for_chat"
                        }
                        variant={hasAssignedChat ? "primary" : "secondary"}
                        width="full"
                        disabled={!hasAssignedChat}
                        onPress={() => router.push("/chats")}
                    />
                </View>

                {hasAccessToStatuses && (
                    <View className="mt-3">
                        <ArticleStatusesList
                            statuses={statuses}
                            selectedStatus={status}
                            onChange={handleStatusChange}
                        />
                    </View>
                )}
            </View>

            <FlatList
                data={filteredAndSortedArticles}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 6,
                    paddingBottom: 36,
                }}
                ItemSeparatorComponent={() => <View className="h-4" />}
                ListEmptyComponent={
                    <View className="items-center py-8">
                        {isLoading ? (
                            <ActivityIndicator />
                        ) : (
                            <Text className="text-center text-base text-slate-600">
                                {t("articles.empty", {
                                    defaultValue: "Brak artykułów",
                                })}
                            </Text>
                        )}
                    </View>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() => {
                            router.push({
                                pathname: "/articles/[id]",
                                params: {
                                    id: String(item.id),
                                },
                            });
                        }}
                    >
                        <ArticleCard article={item} />
                    </TouchableOpacity>
                )}
            />
        </AppBackground>
    );
};

export default MainScreen;
