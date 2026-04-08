import {Text} from "react-native-paper";
import { Image,  View} from "react-native";
import AppBackground from "@/modules/shared/components/App-Background";
import CustomButton from "@/modules/shared/components/Button";
import {useTranslation} from "react-i18next";
import {router} from "expo-router";




const WelcomeComponent: React.FC = () => {
    const {t} = useTranslation();
    return (
        <AppBackground>
            <Image
                source={require("../assets/images/Group 78.png")}
                className="mx-auto my-16"
            />
            <View className="flex w-full mx-auto gap-6 px-4">
                <Text className="text-4xl font-semibold">
                    {t("common.welcome_screen.header")}
                </Text>
                <Text className="text-base font-normal">
                    {t("common.welcome_screen.description")}
                </Text>
                <CustomButton variant={"primary"} width={"full"} onPress={() => {router.navigate("/sign-in")}} title={t("common.welcome_screen.start")} />
            </View>
        </AppBackground>
    );
}

export default WelcomeComponent;