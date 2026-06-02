import {
    useMutation,
    UseMutationResult,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import {
    LoginAccessTokenResponse,
    LoginFormValues,
    RegisterPayload,
    RegisterResponse,
    User,
} from "@/modules/auth/types";
//import { clearAuthSession, isAuthSessionError, redirectToLogin } from "../../helpers/session"; Po co jest ten plik?
import { createContext, ReactNode, useContext, useState } from "react";
import { registerMutation } from "@/modules/auth/queries/registerMutation";
import { loginMutation } from "@/modules/auth/queries/tokenMutation";
import handleApiError from "@/modules/shared/helpers/handleApiError";
import Loader from "@/modules/shared/components/Loader";
import fetchUserDataQuery from "@/modules/auth/queries/fetchUserDataQuery";
import { router } from "expo-router";

interface UserContextType {
    user: User | undefined;
    login: UseMutationResult<LoginAccessTokenResponse, Error, LoginFormValues>;
    isLoading: boolean;
    error: Error | null;
    register: UseMutationResult<RegisterResponse, Error, RegisterPayload>;
    logout: () => void;
    isFetchingUser: boolean;
}

interface Props {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
    const queryClient = useQueryClient();

    const endSession = () => {
        SecureStore.deleteItemAsync("token");
        SecureStore.deleteItemAsync("jwt_type");
        setIsAuthenticated(false);
    };

    const register = useMutation({
        mutationFn: registerMutation,
    });

    const login = useMutation({
        mutationFn: loginMutation,
        onSuccess: (data) => {
            SecureStore.setItemAsync("token", data.access_token);
            SecureStore.setItemAsync("jwt_type", data.token_type);
            setIsAuthenticated(true);
        },
        onError: (error: Error) => {
            handleApiError(Error);
            // endSession(); Po co jest ta funkcja? Dlaczego tutaj?
        },
    });
    const {
        data: user,
        refetch,
        isLoading,
        isFetching,
        error,
    } = useQuery<User, Error>({
        queryKey: ["userData"],
        queryFn: fetchUserDataQuery,
        enabled: isAuthenticated,
        retry: false,
    });

    const logout = () => {
        endSession();
        router.push("/");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                login,
                isLoading,
                error,
                logout,
                register,
                isFetchingUser: isFetching,
            }}
        >
            {children}
            {isLoading && (
                <Loader text="Trwa logowanie..." variant="fullscreen" />
            )}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
