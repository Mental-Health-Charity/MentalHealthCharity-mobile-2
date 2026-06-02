import buildQuery from "./helpers/buildQuery"
import {
    ArticleCategoryOptions,
    ReadArticleOptions,
    ReadArticlesOptions,
    ReadPublicArticlesOptions,
    SearchPublicArticlesOptions, UpdateArticleOptions
} from "@/modules/articles/types";
import {ReadSearchUsersOptions, ReadUserByIdOptions} from "@/modules/users/types";
export const baseUrl = process.env["BASE_URL"]


export const url = {
    login: {
        loginAccessToken: `${baseUrl}/api/v1/login/access-token`,
        testToken: `${baseUrl}/api/v1/login/test-token`,
    },
    users: {
        searchUser(options: ReadSearchUsersOptions) {
            const query = buildQuery(options);

            return `${baseUrl}/api/v1/users/?${query}`;
        },
        readUserById({ id }: ReadUserByIdOptions) {
            return `${baseUrl}/api/v1/users/${id}`;
        },
        updateUser({ id }: ReadUserByIdOptions) {
            return `${baseUrl}/api/v1/users/${id}`;
        },
        updateUserAvatar({ id }: ReadUserByIdOptions) {
            return `${baseUrl}/api/v1/user-public-profile/${id}/avatar`;
        },
        updateUserByAdmin({ id }: ReadUserByIdOptions) {
            return `${baseUrl}/api/v1/users/${id}/edit-as-admin`;
        },
        createUser: `${baseUrl}/api/v1/users/`,
        changePasswordBegin: `${baseUrl}/api/v1/users/reset-password-mail`,
        changePasswordComplete: `${baseUrl}/api/v1/users/change-password`,
        confirmEmailComplete: `${baseUrl}/api/v1/users/confirm`,
        readUsersMe: `${baseUrl}/api/v1/users/me`,
        updateUserMe: `${baseUrl}/api/v1/users/me`,
        createUserOpen: `${baseUrl}/api/v1/users/open`,
        changePassword: `${baseUrl}/api/v1/users/change-password`,
        resetPassword: `${baseUrl}/api/v1/users/reset-password`,
    },
    articles: {
        create: `${baseUrl}/api/v1/article/`,
        readArticles(options: ReadArticlesOptions) {
            const query = buildQuery(options);
            return `${baseUrl}/api/v1/article?${query}`;
        },
        readPublicArticles(options: ReadPublicArticlesOptions) {
            const query = buildQuery(options);
            return `${baseUrl}/api/v1/article/public?${query}`;
        },
        readById({ id }: ReadArticleOptions) {
            return `${baseUrl}/api/v1/article/${id}/detail`;
        },
        searchPublicArticles(options: SearchPublicArticlesOptions) {
            const query = buildQuery(options);
            return `${baseUrl}/api/v1/article/public/search?${query}`;
        },
        readByUser({ author, ...props }: ReadPublicArticlesOptions) {
            const query = buildQuery(props);
            return `${baseUrl}/api/v1/article/public/user/${author}?${query}`;
        },
        update({ id }: UpdateArticleOptions) {
            return `${baseUrl}/api/v1/article/${id}`;
        },
        updateBanner({ id }: UpdateArticleOptions) {
            return `${baseUrl}/api/v1/article/${id}/banner`;
        },
        delete({ id }: UpdateArticleOptions) {
            return `${baseUrl}/api/v1/article/${id}`;
        },
        changeStatus({ id }: UpdateArticleOptions) {
            return `${baseUrl}/api/v1/article/${id}/change-status`;
        },
    },
    articleCategories: {
        update({ id }: ArticleCategoryOptions) {
            return `${baseUrl}/api/v1/article-category/${id}`;
        },
        delete({ id }: ArticleCategoryOptions) {
            return `${baseUrl}/api/v1/article-category/${id}`;
        },
        changeStatus({ id }: ArticleCategoryOptions) {
            return `${baseUrl}/api/v1/article-category/${id}/change-status`;
        },
        read: `${baseUrl}/api/v1/article-category/`,
        create: `${baseUrl}/api/v1/article-category/`,
    },

    // form: {
    //     readById({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}`;
    //     },
    //     update({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}`;
    //     },
    //     delete({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}`;
    //     },
    //     accept({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}/accept`;
    //     },
    //     reject({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}/reject`;
    //     },
    //     read(options: ReadAllFormOptions) {
    //         const query = buildQuery(options);
    //         return `${baseUrl}/api/v1/form/?${query}`;
    //     },
    //     updateNote({ id }: FormOptions) {
    //         return `${baseUrl}/api/v1/form/${id}/notes`;
    //     },
    //     create: `${baseUrl}/api/v1/form/`,
    //     canUserSendForm(options?: CanUserSendFormOptions) {
    //         const query = buildQuery(options ?? {});
    //         return query ? `${baseUrl}/api/v1/form/can-send-form?${query}` : `${baseUrl}/api/v1/form/can-send-form`;
    //     },
    // },
}