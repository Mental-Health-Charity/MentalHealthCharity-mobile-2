import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArticleView from "@/modules/articles/components/ArticleView";
import { articlesQueryOptions } from "@/modules/articles/queries/articlesQueryOptions";
import { getArticleByIdQueryOptions } from "@/modules/articles/queries/getArticleByIdQueryOptions";
import { ArticleStatus } from "@/modules/articles/constants";
import changeStatusMutation from "@/modules/articles/queries/changeStatusMutation";
import Loader from "@/modules/shared/components/Loader";
import { useToast } from "@/modules/shared/components/Toast";
import { useTranslation } from "react-i18next";
import { Roles } from "@/modules/users/constants";
import { useUser } from "@/modules/auth/components/AuthContextProvider";

const ArticleScreen = () => {
    const { user } = useUser();
    const { t } = useTranslation();
    const { id } = useLocalSearchParams<{ id: string }>();
    const articleId = Number(id) || -1;
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    const { data: article, isLoading: isArticleLoading } = useQuery(
        getArticleByIdQueryOptions({ id: articleId }, {}),
    );
    const { data: articles } = useQuery(
        articlesQueryOptions({
            q: "",
            page: 1,
            size: 50,
            status: ArticleStatus.PUBLISHED,
        }),
    );

    const { mutate: changeStatus, isPending: isUpdatingStatus } = useMutation({
        mutationFn: changeStatusMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: getArticleByIdQueryOptions({ id: articleId })
                    .queryKey,
            });
            queryClient.invalidateQueries({
                queryKey: articlesQueryOptions({
                    q: "",
                    page: 1,
                    size: 50,
                    status: ArticleStatus.PUBLISHED,
                }).queryKey,
            });
        },
        onError: () => {
            showToast({
                type: "error",
                title: t("error"),
                description: t("errors.unknown"),
                duration: 4000,
            });
        },
    });

    const getRandomArticles = useCallback(() => {
        const filtered = articles
            ? articles.items.filter(
                  (item) =>
                      item.status === ArticleStatus.PUBLISHED &&
                      item.id !== articleId,
              )
            : [];
        return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
    }, [articles, articleId]);

    const suggestedArticles = getRandomArticles();

    const hasAccessToStatuses =
        user?.user_role === Roles.REDACTOR ||
        user?.user_role === Roles.ADMIN ||
        user?.user_role === Roles.VOLUNTEERSUPERVISOR;

    if (isArticleLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <Loader variant={"small"} />
            </View>
        );
    }

    if (!article) {
        return (
            <View className="flex-1 justify-center items-center bg-white p-4">
                <Text className="text-slate-500 text-base">
                    {t("errors.article_not_found")}
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <TouchableOpacity
                onPress={() => {
                    router.replace("/");
                }}
            ></TouchableOpacity>
            {hasAccessToStatuses && (
                <View className="bg-slate-50 p-4 border-b border-slate-200">
                    <Text className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                        {article.status}
                    </Text>

                    <View className="flex-row flex-wrap gap-2">
                        {Object.values(ArticleStatus).map((statusValue) => {
                            const isCurrent = article.status === statusValue;
                            return (
                                <TouchableOpacity
                                    key={statusValue}
                                    disabled={isCurrent || isUpdatingStatus}
                                    onPress={() =>
                                        changeStatus({
                                            id: articleId,
                                            status: statusValue,
                                            reject_message: "",
                                        })
                                    }
                                    className={`px-3 py-1.5 rounded-md border ${
                                        isCurrent
                                            ? "bg-[#142333] border-[#142333]"
                                            : "bg-white border-slate-300"
                                    } ${isUpdatingStatus ? "opacity-50" : ""}`}
                                >
                                    <Text
                                        className={`text-xs font-semibold ${isCurrent ? "text-white" : "text-slate-700"}`}
                                    >
                                        {statusValue.toLowerCase()}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}

            <ArticleView article={article} onBackPress={() => router.back()} />
        </View>
    );
};

export default ArticleScreen;
