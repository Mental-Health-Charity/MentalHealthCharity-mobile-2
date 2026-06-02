import AppBackground from "@/modules/shared/components/App-Background";
import { Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useUser } from "@/modules/auth/components/AuthContextProvider";
import CustomButton from "@/modules/shared/components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { articlesQueryOptions } from "@/modules/articles/queries/articlesQueryOptions";
import { ArticleStatus } from "@/modules/articles/constants";
import ArticleCard from "@/modules/articles/components/ArticleCard";
import { router } from "expo-router";
import { Roles } from "@/modules/users/constants";
import ArticleStatusesList from "@/modules/articles/components/ArticlesStatusesList";

type Props = {};

const MainScreen = (props: Props) => {
    const { user } = useUser();
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<ArticleStatus>(
        ArticleStatus.PUBLISHED,
    );
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const page = 1;
    const { t } = useTranslation();

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

    const debouncedSetQuery = useCallback(
        debounce((q) => {
            setDebouncedQuery(q);
        }, 500),
        [],
    );

    useEffect(() => {
        debouncedSetQuery(query);
    }, [query, debouncedSetQuery]);

    const { data, isLoading } = useQuery(
        articlesQueryOptions({ q: debouncedQuery, page, size: 50, status }),
    );

    const filteredAndSortedArticles = useMemo(() => {
        if (!data?.items) return [];

        return data.items
            .filter((article) => article.status === status)
            .sort(
                (a, b) =>
                    new Date(b.creation_date).getTime() -
                    new Date(a.creation_date).getTime(),
            );
    }, [data, status]);

    const hasAccessToStatuses =
        user?.user_role === Roles.REDACTOR ||
        user?.user_role === Roles.ADMIN ||
        user?.user_role === Roles.VOLUNTEERSUPERVISOR;

    return (
        <AppBackground>
            <View>
                <Text>{user?.full_name}</Text>
                <Text>{t("common.login_screen.header")}</Text>

                {user?.is_assigned_to_chat ? (
                    <CustomButton
                        title={t("user.chat_with.volunteer")}
                        variant={"primary"}
                    />
                ) : (
                    <CustomButton
                        title={t("user.wait_for_chat")}
                        variant={"secondary"}
                    />
                )}
            </View>

            {hasAccessToStatuses && (
                <ArticleStatusesList status={status} onChange={setStatus} />
            )}

            {filteredAndSortedArticles.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        router.push(`/articles/${item.id}`);
                    }}
                >
                    <ArticleCard article={item} />
                </TouchableOpacity>
            ))}
        </AppBackground>
    );
};

export default MainScreen;
