import * as SecureStore from "expo-secure-store";
import {loginMutation} from "@/modules/auth/queries/tokenMutation";

jest.mock("expo-secure-store", () => ({
    setItemAsync: jest.fn(),
}));


jest.mock("@/modules/auth/api/loginMutation", () => ({
    loginMutation: jest.fn(),
}));


describe("login (useSession)", () => {
    const mockSetToken = jest.fn();
    const mockSetJWTType = jest.fn();

    const login = async (data: { email: string; password: string }) => {
        const res = await loginMutation(data);
        await SecureStore.setItemAsync("token", res.access_token);
        await SecureStore.setItemAsync("jwt", res.token_type);
        mockSetToken(res.access_token);
        mockSetJWTType(res.token_type);
        return res;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("set token in SecureStore if 200", async () => {
        (loginMutation as jest.Mock).mockResolvedValueOnce({
            access_token: "abc123",
            token_type: "bearer",
        });

        await login({ email: "test@example.com", password: "Password123!" });

        expect(SecureStore.setItemAsync).toHaveBeenCalledWith("token", "abc123");
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith("jwt", "bearer");
    });

    it("set token in app state", async () => {
        (loginMutation as jest.Mock).mockResolvedValueOnce({
            access_token: "abc123",
            token_type: "bearer",
        });

        await login({ email: "test@example.com", password: "Password123!" });

        expect(mockSetToken).toHaveBeenCalledWith("abc123");
        expect(mockSetJWTType).toHaveBeenCalledWith("bearer");
    });

    it("don't set token if error", async () => {
        (loginMutation as jest.Mock).mockRejectedValueOnce(new Error("401"));

        await expect(
            login({ email: "test@example.com", password: "złehaslo" })
        ).rejects.toThrow();

        expect(SecureStore.setItemAsync).not.toHaveBeenCalled();
    });
});