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
        return await loginResponse.json()
    }catch (err){
        throw err
    }
}
