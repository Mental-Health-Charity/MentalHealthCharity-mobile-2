import * as Yup  from "yup"
import {Formik} from "formik"
import { useTranslation } from "react-i18next";
import {LoginFormValues} from "../../types"
import {Pressable, Text, TextInput, View} from "react-native";
import {router} from "expo-router";
import AuthScreenNavigation from "@/modules/auth/components/AuthScreenNavigation";


interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => void;
}

const LoginForm = ({onSubmit}: LoginFormProps) => {
    const { t } = useTranslation();

    const initialValues = {
        email: "",
        password: "",

    };

    const validationSchema = Yup.object({
        email: Yup.string().email(t("validation.invalid_email")).required(t("validation.required")),
        password: Yup.string().min(8, t("validation.incorrect_password_format")).required(t("validation.required")),
    });

    return (
        <View>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={() => console.log("Good")}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View className="flex flex-col gap-4">

                        <View className="gap-4">
                            <View className="gap-1">
                                <TextInput
                                    className="rounded-2xl border border-[#C5C6CC] w-full p-4"
                                    value={values.email}
                                    placeholder={t("common.login_screen.email")}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                />
                                {touched.email && errors.email && (
                                    <Text className="text-red-500 text-sm">{errors.email}</Text>
                                )}
                            </View>

                            <View className="gap-1">
                                <TextInput
                                    className="rounded-2xl border border-[#C5C6CC] w-full p-4"
                                    value={values.password}
                                    placeholder={t("common.login_screen.password")}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry
                                />
                                {touched.password && errors.password && (
                                    <Text className="text-red-500 text-sm">{errors.password}</Text>
                                )}
                            </View>
                        </View>

                        <View className="flex flex-row justify-between items-center">
                            <Pressable onPress={() => router.navigate("/reset-password")}>
                                <Text className="border-b border-[#71727A] text-[#71727A] text-sm">
                                    {t("common.login_screen.forgot_password")}
                                </Text>
                            </Pressable>

                            <View className="flex-row items-center gap-1">
                                <Text className="text-[#71727A] text-sm">
                                    {t("common.login_screen.no_account")}
                                </Text>
                                <Pressable onPress={() => router.navigate("/sign-up")}>
                                    <Text className="text-[#2BB5A0] font-semibold text-sm">
                                        {t("common.login_screen.register")}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <AuthScreenNavigation
                            primaryTitle={"common.login_screen.login"}
                            primaryVariant={"primary"}
                            onPrimaryPress={handleSubmit}
                            secondaryTitle={"common.login_screen.return"}
                            secondaryVariant={"secondary"}
                            secondaryHref={() => router.navigate("/welcome-screen")}
                        />
                    </View>
                )}
            </Formik>
        </View>
    )
    
}

export default LoginForm;