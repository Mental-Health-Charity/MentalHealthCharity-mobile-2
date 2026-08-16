import { useCallback, useEffect, useMemo, useState } from "react";
import { ArticleStatus } from "@/modules/articles/constants";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { articlesQueryOptions } from "@/modules/articles/queries/articlesQueryOptions";

export const useArticles = () => {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<ArticleStatus>(
        ArticleStatus.PUBLISHED,
    );
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    const page = 1;

    const debouncedSetQuery = useMemo(
        () =>
            debounce((q: string) => {
                setDebouncedQuery(q);
            }, 500),
        [],
    );

    useEffect(() => {
        debouncedSetQuery(query);

        return () => {
            debouncedSetQuery.cancel();
        };
    }, [query, debouncedSetQuery]);

    const { data, isLoading } = useQuery(
        articlesQueryOptions({
            q: debouncedQuery,
            page,
            size: 50,
            status,
        }),
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

    const handleStatusChange = useCallback((selectedStatus: ArticleStatus) => {
        setStatus(selectedStatus);
    }, []);

    return {
        query,
        setQuery,
        status,
        filteredAndSortedArticles,
        isLoading,
        handleStatusChange,
    };
};
