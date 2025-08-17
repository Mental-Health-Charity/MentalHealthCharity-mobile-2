import * as Yup  from "yup"
import {Form, Field, Formik} from "formik"
import { useTranslation } from "react-i18next";
import {LoginFormValues} from "../../types"


interface LoginFormProps {
    onSubmit: (values:LoginFormValues) => void;
    disabled?: boolean;
    initial?: LoginFormValues;
}

const LoginForm = ({onSubmit, disabled, initial}: LoginFormProps) => {
    const { t } = useTranslation();
    
    const initialValues = {
        email: "",
        password: "",
        ...initial,
    };

    const validationSchema = Yup.object({
        email: Yup.string().email(t("validation.invalid_email")).required(t("validation.required")),
        password: Yup.string().min(8, t("validation.incorrect_password_format")).required(t("validation.required")),
    });
    
}

export default LoginForm;