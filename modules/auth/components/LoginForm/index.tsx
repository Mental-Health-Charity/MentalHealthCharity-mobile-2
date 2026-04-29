import AuthScreenNavigation from "@/modules/auth/components/AuthScreenNavigation";
import { router } from "expo-router";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Pressable, Text, TextInput, View } from "react-native";
import * as Yup from "yup";
import { LoginFormValues } from "../../types";

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { t } = useTranslation();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email(t("validation.invalid_email"))
            .required(t("validation.required")),
        password: Yup.string()
            .min(8, t("validation.invalid_password"))
            .required(t("validation.required")),
    });

    return (
        <View className="flex-1">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View className="flex-1 flex-col justify-between">
                        <View className="gap-4 ">
                            <View className="gap-1  ">
                                <TextInput
                                    className="rounded-2xl border border-[#C5C6CC] w-full p-4"
                                    value={values.email}
                                    placeholder={t("common.login_screen.email")}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                />
                                {touched.email && errors.email && (
                                    <Text className="text-red-500 text-sm">
                                        {errors.email}
                                    </Text>
                                )}
                            </View>

                            <View className="gap-1">
                                <TextInput
                                    className="rounded-2xl border border-[#C5C6CC] w-full p-4"
                                    value={values.password}
                                    placeholder={t(
                                        "common.login_screen.password",
                                    )}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    secureTextEntry
                                />
                                {touched.password && errors.password && (
                                    <Text className="text-red-500 text-sm">
                                        {errors.password}
                                    </Text>
                                )}
                            </View>
                            <View className="flex flex-row justify-between items-center">
                                <Pressable
                                    onPress={() =>
                                        router.navigate("/reset-password")
                                    }
                                >
                                    <Text className="border-b border-[#71727A] text-[#71727A] text-sm">
                                        {t(
                                            "common.login_screen.forgot_password",
                                        )}
                                    </Text>
                                </Pressable>

                                <View className="flex-row items-center gap-1">
                                    <Text className="text-[#71727A] text-sm">
                                        {t("common.login_screen.no_account")}
                                    </Text>
                                    <Pressable
                                        onPress={() =>
                                            router.navigate("/sign-up")
                                        }
                                    >
                                        <Text className="text-[#2BB5A0] font-semibold text-sm">
                                            {t("common.login_screen.register")}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>

                        <View className="bg-[#E6FFFA]">
                            <AuthScreenNavigation
                                primaryTitle={"common.login_screen.login"}
                                primaryVariant={"primary"}
                                onPrimaryPress={() => {
                                    console.log("1");
                                    handleSubmit();
                                    console.log("2");
                                }}
                                secondaryTitle={"common.login_screen.return"}
                                secondaryVariant={"secondary"}
                                secondaryHref={() => {
                                    router.navigate("/welcome-screen");
                                }}
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default LoginForm;
