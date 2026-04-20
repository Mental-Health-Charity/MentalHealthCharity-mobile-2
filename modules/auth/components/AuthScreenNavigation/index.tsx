import {ReactNode} from "react";
import {ImageBackground, View} from "react-native";
import CustomButton, {IButtonProps} from "@/modules/shared/components/Button";
// @ts-ignore
import backgroundImage from "../../../../assets/images/Group68.png"
import {useTranslation} from "react-i18next";
import {useSafeAreaInsets} from "react-native-safe-area-context";




interface IAuthScreenNavigation {
    primaryTitle: string;
    primaryVariant: IButtonProps['variant'];
    onPrimaryPress: () => void;
    secondaryTitle: string;
    secondaryVariant: IButtonProps['variant'];
    secondaryHref: () => void;
}



export default function AuthScreenNavigation({...props}: IAuthScreenNavigation): ReactNode {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    return(
        <View className="flex flex-col -mx-8 ">
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
                    width={"auto"}
                    title={t(`${props.primaryTitle}`)}
                    variant={props.primaryVariant}
                    onPress={props.onPrimaryPress}
                />
                <CustomButton
                    width={"full"}
                    title={t(`${props.secondaryTitle}`)}
                    variant={props.secondaryVariant}
                    onPress={props.secondaryHref}
                />
            </ImageBackground>
        </View>
    )
}