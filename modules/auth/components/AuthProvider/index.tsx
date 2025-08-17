import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
    LoginAccessTokenResponse,
    LoginFormValues,
    RegisterFormValues,
    RegisterResponse,
    ResetPasswordPayload,
    User
} from "../../types";
import {createContext, ReactNode, useContext, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {registerMutation} from "@/modules/auth/queries/registerMutation";
import {loginMutation} from "@/modules/auth/queries/tokenMutation";
import {fetchUserDataQuery} from "@/modules/auth/queries/fetchUserDataQuery";

interface UserContextType {
    User: User | undefined;
    registerMutation: UseMutationResult<RegisterResponse, unknown, RegisterFormValues>;
    loginMutation: UseQueryResult<LoginAccessTokenResponse, LoginFormValues>;
    resetPasswordMutation: UseMutationResult<User, unknown, ResetPasswordPayload, unknown>;
    isLoading: boolean;
    error: Error | null;
    logout: () => void;
    isFetchinguser: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const UserProvider = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!AsyncStorage.getItem("token"));
    
    const register = useMutation({
        mutationFn: registerMutation,
        onMutate: () => {
            setIsAuthenticated(true)
        },
        onSuccess: (res,  val) =>{
            return login.mutateAsync({
                email: res.email,
                password: val.password
            })
            
        },
        onError: () => {
            setIsAuthenticated(false);
        }
    })

    const login = useMutation({
        mutationFn: loginMutation,
        onMutate: () => {
            setIsAuthenticated(true);
        },
        onSuccess: () => {
            refetch();
        },
        onError: () => {
            setIsAuthenticated(false);
        },
    });

    const {data:user, refetch, isLoading, isFetching, error}: UseQueryResult<User,  Error> = useQuery({
        queryKey: ["userData"],
        queryFn: fetchUserDataQuery,
        enabled: isAuthenticated,
    })
    
    const logout = () => {
        AsyncStorage.removeItem("token")
        setIsAuthenticated(false)
    }
    return <UserContext.Provider value={{ user, login, isLoading, error, logout, register, isFetchingUser: isFetching }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};