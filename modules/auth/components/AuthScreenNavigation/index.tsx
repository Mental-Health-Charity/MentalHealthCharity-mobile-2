import {ReactNode} from "react";
import {ImageBackground, View} from "react-native";
import CustomButton, {IButtonProps} from "@/modules/shared/components/Button";
// @ts-ignore
import backgroundImage from "../../../../assets/images/Group68.png"
import {useTranslation} from "react-i18next";




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
    return(
        <View className="flex flex-col">
            <ImageBackground
                className="gap-3 pt-8 pb-10 px-6"
                source={backgroundImage}
            >
                <CustomButton
                    width={"full"}
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