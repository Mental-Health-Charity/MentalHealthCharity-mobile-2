import {RegisterFormValues, RegisterResponse, ResetPasswordPayload, User} from "@/modules/auth/types";


const resetPasswordMutation = async (payload: ResetPasswordPayload): Promise<User> => {
    try {
        const resetPasswordResponse = await fetch("https://localhost:8080/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(payload)
        })

        const newUser = await resetPasswordResponse.json();

        if (!resetPasswordResponse.ok) {
            throw new Error()
        }

        return newUser;
    }catch (err) {
        throw err
    }
}