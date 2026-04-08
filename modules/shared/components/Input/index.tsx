// Input.tsx
import {TextInput, Text, NativeSyntheticEvent, TextInputFocusEventData} from "react-native";

type InputVariant = "text" | "number" | "email" | "password";
type InputWidth = "auto" | "full" | "half";

interface IProps {
    variant: InputVariant;
    width: InputWidth;
    value: string;
    onChangeText: (text: string) => void;
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    placeholder: string;
    error?: string;
}

export default function Input({ variant, width, value, onChangeText, onBlur, placeholder, error }: IProps) {
    const widthStyles: Record<InputWidth, string> = {
        auto: "px-4",
        full: "w-full",
        half: "w-1/2",
    };

    return (
        <>
            <TextInput
                value={value}
                secureTextEntry={variant === "password"}
                placeholder={placeholder}
                onChangeText={onChangeText}
                onBlur={onBlur}
                className={`border-2 border-[#C5C6CC] rounded-md ${widthStyles[width]}`}
            />
            {error && <Text className="text-red-500">{error}</Text>}
        </>
    );
}
