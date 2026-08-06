import { queryOptions, UseQueryOptions } from "@tanstack/react-query";
import { url } from "@/api";
import { Article, ReadPublicArticlesOptions } from "../types";
import { Pagination } from "../../shared/types";
import handleApiError from "../../shared/helpers/handleApiError";

export const articlesByUserQueryOptions = (
    options: ReadPublicArticlesOptions,
    additional?: Omit<UseQueryOptions<Pagination<Article>>, "queryFn">,
) => {
    queryOptions<Pagination<Article>>({
        queryKey: ["articles"],
        queryFn: async () => {
            try {
                const response = await fetch(url.articles.readByUser(options));

                const data = await response.json();

                if (!response.ok) {
                    await handleApiError(data);
                }

                return data;
            } catch (error) {
                console.error("Error fetching articles:", error);
                throw error;
            }
        },
        ...additional,
    });
};
