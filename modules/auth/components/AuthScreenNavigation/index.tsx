import { ReactNode } from "react";
import { ImageBackground, View } from "react-native";
import CustomButton from "@/modules/shared/components/Button";
// @ts-ignore
import backgroundImage from "../../../../assets/images/Group68.png";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IAuthScreenNavigation {
    submitTitle: string;
    onSubmit: () => void;
    cancelTitle: string;
    onReturn: () => void;
}

export default function AuthScreenNavigation({
                                                 submitTitle,
                                                 onSubmit,
                                                 cancelTitle,
                                                 onReturn,
                                             }: IAuthScreenNavigation): ReactNode {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex flex-col -mx-8">
            <ImageBackground
                resizeMode="cover"
                style={{
                    paddingBottom: insets.bottom,
                    paddingTop: 60,
                    width: '100%',
                }}
                className="gap-3 px-6"
                source={backgroundImage}
            >
                <CustomButton
                    width="auto"
                    title={submitTitle}
                    variant="primary"
                    onPress={onSubmit}
                />
                <CustomButton
                    width="full"
                    title={cancelTitle}
                    variant="secondary"
                    onPress={onReturn}
                />
            </ImageBackground>
        </View>
    );
}