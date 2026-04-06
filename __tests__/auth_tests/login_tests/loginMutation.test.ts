import {loginMutation} from "@/modules/auth/queries/tokenMutation"

const mockFetch = jest.fn();

const validData = {
    email: "test@example.com",
    password: "Password123!",
}

describe('Login Mutation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("returns tokens successfully", async () => {
        const mockResponse = {
            token: "aaasasdasd",
            token_type: "Bearer",
        }

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await loginMutation(validData);

        expect(result.access_token).toBe("abc123");
        expect(result.token_type).toBe("bearer");
    })

    it("sends payload properly", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ access_token: "abc123", token_type: "bearer" }),
        });

        await loginMutation(validData);

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    username: validData.email,
                    password: validData.password,
                }),
            })
        );
    })

    it("returns error if server resoponse is 400", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: "Nieprawidłowe dane" }),
        });

        await expect(loginMutation(validData)).rejects.toThrow();
    })

    it("returns error if server resoponse is 500", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));

        await expect(loginMutation(validData)).rejects.toThrow("Network error");
    })
})


