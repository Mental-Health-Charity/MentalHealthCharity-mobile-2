import {validation} from "@/modules/shared/constants";
import {Formik} from "formik"
import * as Yup  from "yup"
import {View} from "react-native";
import Input from "@/modules/shared/components/Input";
import {router} from "expo-router";
import AuthScreenNavigation from "@/modules/auth/components/AuthScreenNavigation";
import {useTranslation} from "react-i18next";
import {ResetPasswordPayload} from "@/modules/auth/types";

interface IResetPasswordEmailProps {
    onSubmit: (values: ResetPasswordPayload) => void;
}

const ResetPasswordSendEmail = ({onSubmit}: IResetPasswordEmailProps) => {
    const { t } = useTranslation();

    const initialValues: ResetPasswordPayload = {
        email: "",
    }

    const validationSchema = Yup.object().shape({
        email: validation.email.required(),
    })


    return (
        <View className="flex-1">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="flex flex-1 justify-between">
                        <View className="gap-4">
                            <Input
                                variant="text"
                                width="full"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                placeholder={t("common.register_screen.email")}
                                error={touched.email && errors.email ? errors.email : ""}
                            />
                        </View>
                        <AuthScreenNavigation
                            submitTitle={t("common.login_screen.login")}
                            onSubmit={handleSubmit}
                            cancelTitle={t("common.login_screen.return")}
                            onReturn={() => {
                                router.navigate("/sign-in");
                            }}
                        />

                    </View>

                )}

            </Formik>
        </View>
    );
};
export default ResetPasswordSendEmail;
