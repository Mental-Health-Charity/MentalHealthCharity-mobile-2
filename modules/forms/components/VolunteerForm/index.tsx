import { Text, View } from "react-native";
import { VolunteerFormValues } from "@/modules/forms/types";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useUser } from "@/modules/auth/components/AuthContextProvider";
import { useRef, useState } from "react";
import { useFormik } from "formik";

interface Props {
    onSubmit: (values: VolunteerFormValues) => void;
    initStep?: number;
}

const THEME_OPTIONS = [
    { value: "no", key: "no" },
    { value: "depression", key: "depression" },
    { value: "alcoholism", key: "alcoholism" },
    { value: "drug_addiction", key: "drug_addiction" },
    { value: "self_harm", key: "self_harm" },
    { value: "suicidal_thoughts", key: "suicidal_thoughts" },
    { value: "eating_disorders", key: "eating_disorders" },
    { value: "domestic_violence", key: "domestic_violence" },
    { value: "homelessness", key: "homelessness" },
    { value: "sexual_assault", key: "sexual_assault" },
    { value: "grief_loss", key: "grief_loss" },
    { value: "trauma", key: "trauma" },
    { value: "anxiety", key: "anxiety" },
    { value: "burnout", key: "burnout" },
    { value: "loneliness", key: "loneliness" },
];

const Index = ({ onSubmit, initStep = 0 }: Props) => {
    const { t } = useTranslation();
    const { user } = useUser();

    const [step, setStep] = useState(initStep);
    const [direction, setDirection] = useState(1);
    const prevStepRef = useRef(step);

    const initialValues: VolunteerFormValues = {
        age: "",
        contacts: ["-"],
        description: "",
        did_help: "",
        reason: "",
        education: "",
        phone: "",
        source: "",
        themes: [],
        tos: false,
        interview_meeting_dates: [],
    };

    const validationSchemas = [
        Yup.object({
            age: Yup.number()
                .min(18, t("validation.age.min"))
                .required(t("validation.required")),
        }),
        Yup.object({
            education: Yup.string().required(t("validation.required")),
        }),
        Yup.object({
            phone: Yup.string()
                .matches(/^[0-9]+$/, t("validation.phone"))
                .required(t("validation.required")),
            contacts: Yup.array()
                .of(Yup.string())
                .min(1, t("validation.required")),
        }),
        Yup.object({
            description: Yup.string()
                .min(10, t("validation.description.tooShort"))
                .required(t("validation.required")),
        }),
        Yup.object({
            interview_meeting_dates: Yup.array().min(
                1,
                t("validation.required"),
            ),
        }),
        Yup.object({
            source: Yup.string().required(t("validation.required")),
            did_help: Yup.string().required(t("validation.required")),
        }),
        Yup.object({
            themes: Yup.array(),
            tos: Yup.boolean().oneOf([true], t("validation.consent.required")),
        }),
    ];

    const LAST_STEP = validationSchemas.length - 1;

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemas[step],
        onSubmit: (values) => {
            if (step === LAST_STEP) {
                onSubmit(values);
                setDirection(1);
                prevStepRef.current = step;
                setStep(validationSchemas.length);
            } else {
                setDirection(1);
                prevStepRef.current = step;
                setStep((prevStep) => prevStep + 1);
            }
        },
    });

    const handleBack = () => {
        setDirection(-1);
        prevStepRef.current = step;
        setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
    };

    const handleAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const formattedText = text.replace(/[^0-9]/g, "");
        formik.setFieldValue("age", formattedText);
    };

    const handleThemeToggle = (value: string) => {
        const current = formik.values.themes;
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        formik.setFieldValue("themes", next);
    };
    return (
        <View>
            <Text>Index</Text>
        </View>
    );
};
export default Index;
