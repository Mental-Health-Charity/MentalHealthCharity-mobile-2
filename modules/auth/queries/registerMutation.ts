import {RegisterFormValues, RegisterResponse} from "@/modules/auth/types";


export const registerMutation = async (data:RegisterFormValues): Promise<RegisterResponse> => {
    try {
        const registerResponse = await fetch("https://backend.fundacjaperyskop.org/api/v1/users/", {
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
            console.log(Error)
            throw new Error()
        }

        return newUser;
    }catch (err) {
        console.error(err);
        throw err
    }
}