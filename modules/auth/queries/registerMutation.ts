import {RegisterFormValues, RegisterResponse} from "@/modules/auth/types";


export const registerMutation = async (data:RegisterFormValues): Promise<RegisterResponse> => {
    try {
        const registerResponse = await fetch("https://api.fundacjaperyskop.org/docs#/users/create_user_api_v1_users__post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                full_name: data.full_name,
            }),
        })

        const newUser = await registerResponse.json();

        if (!registerResponse.ok) {
            throw new Error()
        }

        return newUser;
    }catch (err) {
        throw err
    }
}