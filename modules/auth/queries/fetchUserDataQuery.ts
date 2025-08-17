import {User} from "../types"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserDataQuery = async ():Promise<User> => {
    try {
        const token = AsyncStorage.getItem("token")
        const tokenType = AsyncStorage.getItem("jwt_type")
        if (!token || !tokenType) {
            throw new Error("Brak tokenu.");
        }
        
        const response = await fetch("http://localhost:8080/readUsersMe", {
            headers: {
                Authorization: `${tokenType} ${token}`,
            },
            
        })
        const data = await response.json();
        if (!response.ok){
            throw new Error("")
        }
        
        return data
    }catch (err){
        throw err;
    }
}