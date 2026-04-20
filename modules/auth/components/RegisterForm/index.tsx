import {useTranslation} from "react-i18next";
import {validation} from "@/modules/shared/constants";
import {Formik} from "formik"
import * as Yup  from "yup"
import {Pressable, Text, View} from "react-native";
import {RegisterFormValues} from "@/modules/auth/types";
import {router} from "expo-router";
import AuthScreenNavigation from "@/modules/auth/components/AuthScreenNavigation";
import Input from "@/modules/shared/components/Input";
import React from "react";


interface IRegisterProps {
    onSubmit: (values: RegisterFormValues) => void;
}

const RegisterForm = ({onSubmit}:IRegisterProps)=> {
    const { t } = useTranslation();


    const initialValues: RegisterFormValues = {
        email: "",
        password: "",
        confirmPassword: "",
        policy_confirm: false,
        full_name: "",
    };

    const validationSchema = Yup.object({
        full_name: Yup.string().required(t("validation.required")),
        email: validation.email,
        password: validation.password,
        confirmPassword: validation.confirmPassword,
        policy_confirm: Yup.boolean()
            .oneOf([true], t("validation.required"))
            .required(t("validation.required")),
    });



    return (
        <View className="flex-1">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (

                        <View className="flex flex-1 justify-between">
                            <View className="gap-4">
                            <Input
                                variant="text"
                                width="full"
                                value={values.full_name}
                                onChangeText={handleChange("full_name")}
                                onBlur={handleBlur("full_name")}
                                placeholder={t("common.register_screen.username")}
                                error={touched.full_name && errors.full_name ? errors.full_name : ""}
                            />

                            <Input
                                variant="text"
                                width="full"
                                value={values.email}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                placeholder={t("common.register_screen.email")}
                                error={touched.email && errors.email ? errors.email : ""}
                            />

                            <Input
                                variant="password"
                                width="full"
                                value={values.password}
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                placeholder={t("common.register_screen.password")}
                                error={touched.password && errors.password ? errors.password : ""}
                            />

                            <Input
                                variant="password"
                                width="full"
                                value={values.confirmPassword}
                                onChangeText={handleChange("confirmPassword")}
                                onBlur={handleBlur("confirmPassword")}
                                placeholder={t("common.register_screen.confirm_password")}
                                error={
                                    touched.confirmPassword && errors.confirmPassword
                                        ? errors.confirmPassword
                                        : ""
                                }
                            />

                                <View className="flex flex-row items-center gap-2 mt-2">
                                    <Pressable
                                        onPress={() => setFieldValue("policy_confirm", !values.policy_confirm)}
                                        className={`w-5 h-5 rounded border ${
                                            values.policy_confirm ? "bg-[#2BB5A0] border-[#2BB5A0]" : "border-[#C5C6CC]"
                                        } items-center justify-center`}
                                    >
                                        {values.policy_confirm && (
                                            <Text className="text-white text-xs">✓</Text>
                                        )}
                                    </Pressable>
                                    <Text className="text-sm text-gray-600">
                                        {t("common.register_screen.policy")}
                                    </Text>
                                </View>
                                {touched.policy_confirm && errors.policy_confirm && (
                                    <Text className="text-red-500 text-sm">{errors.policy_confirm}</Text>
                                )}
                                <View className="flex flex-row  mt-2">
                                    <Text className="text-sm text-gray-600">
                                        {t("common.register_screen.have_account")}{" "}
                                    </Text>
                                    <Pressable onPress={() => router.navigate("/sign-in")}>
                                        <Text className="text-sm text-[#2BB5A0] font-semibold">
                                            {t("common.register_screen.login")}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <AuthScreenNavigation
                                primaryTitle={"common.register_screen.register"}
                                primaryVariant={"primary"}
                                onPrimaryPress={() => {
                                    console.log("1")
                                    handleSubmit()
                                    console.log("2")
                                }}
                                secondaryTitle={"common.login_screen.return"}
                                secondaryVariant={"secondary"}
                                secondaryHref={() => router.navigate("/welcome-screen")}
                            />

                        </View>

                )}

            </Formik>
        </View>

    );
}

export default RegisterForm;