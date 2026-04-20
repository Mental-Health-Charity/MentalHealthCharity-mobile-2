export const resetPasswordSendEmailMutation = async (email: string) =>{
    try {
        const resetRequestResponse = await fetch("https://backend.fundacjaperyskop.org/api/v1/users/reset-password-mail",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
            })
        })

        const token: string = await resetRequestResponse.json()
        if(!resetRequestResponse.ok){
            throw new Error()
        }
        return token
    }catch(error){
        console.log(error);
    }
}