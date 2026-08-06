import { Roles } from "@/modules/users/constants";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

export enum ArticleStatus {
    DRAFT = "DRAFT",
    SENT = "SENT",
    REJECTED = "REJECTED",
    CORRECTED = "CORRECTED",
    PUBLISHED = "PUBLISHED",
    DELETED = "DELETED",
}

export const statuses = [
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

export enum ArticleRequiredRoles {
    ANYONE = "ANYONE",
    ADMIN = Roles.ADMIN,
    VOLUNTEER = Roles.VOLUNTEER,
    SUPERVISOR = Roles.VOLUNTEERSUPERVISOR,
}
