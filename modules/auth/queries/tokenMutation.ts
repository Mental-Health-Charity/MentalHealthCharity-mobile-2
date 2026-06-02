import {LoginAccessTokenResponse, LoginPayload} from "@/modules/auth/types";
import handleApiError from "@/modules/shared/helpers/handleApiError";
import {url} from "@/api";


export const loginMutation = async (data: LoginPayload): Promise<LoginAccessTokenResponse> => {
    try {
        const payload: Record<string, string> = {
            email: data.email,
            password: data.password,

        }
        if (data.intent) {
            payload.intent = data.intent;
        }

        if (data.next) {
            payload.next = data.next;
        }

        const loginResponse = await fetch(url.login.loginAccessToken, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: data.email,
                password: data.password,
            })

        })
        const user = await loginResponse.json();
        if (!loginResponse.ok) {
            await handleApiError(user);
        }
        return user;
    }catch (err){
        throw err
    }
}
