import AsyncStorage from '@react-native-async-storage/async-storage'
import {LoginAccessTokenResponse, LoginFormValues} from "@/modules/auth/types";


export const loginMutation = async (data: LoginFormValues): Promise<LoginAccessTokenResponse> => {
    try {
        const loginResponse = await fetch('http://localhost:8080', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: data.email,
                password: data.password,
            })

        })
        if (!loginResponse.ok) {
            throw Error;
        }
        const tokenData = await loginResponse.json()

        await AsyncStorage.setItem("token", tokenData.access_token)
        await AsyncStorage.setItem("jwt_type", tokenData.token_type)

        return tokenData
    }catch (err){
        throw err
    }
}
