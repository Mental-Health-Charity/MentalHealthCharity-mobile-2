import { ImageBackground, View } from "react-native";
import React from "react";

interface IProps {
    children: React.ReactNode;
}

export default function AppBackground({ children }: IProps) {

    return (
        <ImageBackground
            source={require("../../../../assets/images/Group 69.png")}
            className=" w-full h-1/2"
            resizeMode="cover"
        >
            <View className="flex-1 flex justify-between">
                <View className="flex-1">{children}</View>

            </View>
        </ImageBackground>
    );
}