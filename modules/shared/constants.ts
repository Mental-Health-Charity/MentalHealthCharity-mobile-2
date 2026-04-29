import * as Yup from "yup";
import i18n from "../../locales/i18n/i18n";

export const validation = {
    password: Yup.string()
        .min(8, i18n.t("validation.incorrect_password_format"))
        .matches(/[A-Z]/, i18n.t("validation.min_one_uppercase"))
        .matches(/\d/, i18n.t("validation.min_one_number"))
        .required(i18n.t("validation.required")),
    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password"), undefined],
            i18n.t("validation.passwords_must_match"),
        )
        .required(i18n.t("validation.required")),
    email: Yup.string()
        .email(i18n.t("validation.invalid_email"))
        .required(i18n.t("validation.required")),
    token: Yup.string().required(i18n.t("validation.required")),
};

export enum Languages {
    EN = "en",
    PL = "pl",
}
