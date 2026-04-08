import {registerMutation} from "@/modules/auth/queries/registerMutation";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const validData = {
    email: "test@example.com",
    password: "Password123!",
    full_name: "Jan Kowalski",
    confirmPassword: "Password123!",
    policy_confirm: true,
};

describe("registerMutation", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("zwraca dane użytkownika gdy rejestracja się uda", async () => {
        const mockUser = { id: 1, email: "test@example.com" };

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        const result = await registerMutation(validData);

        expect(result).toEqual(mockUser);
    });

    it("wysyła poprawne dane do API", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({}),
        });

        await registerMutation(validData);

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify({
                    email: validData.email,
                    password: validData.password,
                    full_name: validData.full_name,
                }),
            })
        );
    });

    it("rzuca błąd gdy serwer zwróci błąd (np. 400)", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: "Email już istnieje" }),
        });

        await expect(registerMutation(validData)).rejects.toThrow();
    });

    it("rzuca błąd przy problemie z siecią", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        await expect(registerMutation(validData)).rejects.toThrow("Network error");
    });
});