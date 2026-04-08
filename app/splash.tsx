import { SplashScreen } from 'expo-router';
import {useSession} from "@/modules/auth/context/ctx";


 function SplashScreenController() {
    const { isLoading } = useSession();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}

export default SplashScreenController