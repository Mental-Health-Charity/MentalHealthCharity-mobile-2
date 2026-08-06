import { ErrorMessage } from "@/modules/shared/types";
import Errors from "@/modules/shared/constants";

const getResponseDetail = async (response: Response) => {
    try {
        const data = (await response.json()) as unknown;

        if (data && typeof data === "object" && "detail" in data) {
            const detail = (data as { detail: unknown }).detail;

            if (typeof detail === "string") {
                return detail;
            }

            if (Array.isArray(detail)) {
                const firstMessage = detail.find(
                    (item) =>
                        item &&
                        typeof item === "object" &&
                        "msg" in item &&
                        typeof item.msg === "string",
                );

                if (firstMessage && "msg" in firstMessage) {
                    return firstMessage.msg as string;
                }
            }
        }
    } catch {
        return response.statusText;
    }

    return response.statusText;
};

async function handleApiError(error: unknown): Promise<Error> {
    let errorDetail: string | undefined;

    if (error instanceof Response) {
        errorDetail = await getResponseDetail(error);
    } else if (error instanceof Error) {
        errorDetail = error.message;
    } else if (error && typeof error === "object" && "detail" in error) {
        const detail = (error as { detail: unknown }).detail;

        if (typeof detail === "string") {
            errorDetail = detail;
        }
    } else if (error && typeof error === "object" && "response" in error) {
        const errResp = (error as { response?: { data?: { detail?: string } } })
            .response?.data;

        if (errResp?.detail) {
            errorDetail = errResp.detail;
        }
    }

    const errorCode = errorDetail
        ? errorDetail.toUpperCase().replace(/ /g, "_")
        : ErrorMessage.UNKNOWN;
    const name =
        ErrorMessage[errorCode as keyof typeof ErrorMessage] ??
        ErrorMessage.UNKNOWN;
    const message = Errors[name] || Errors[ErrorMessage.UNKNOWN];

    throw { name, message };
}

export default handleApiError;
