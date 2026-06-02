import {useToast} from "@/modules/shared/components/Toast";
import {ErrorMessage} from "@/modules/shared/types";
import Errors from "@/modules/shared/constants";

async function handleApiError(error: unknown): Promise<Error> {
    const toast = useToast();
    let errorDetail: string | undefined;

    if (error instanceof Error) {
        errorDetail = error.message;
    }else if(error &&  typeof error === "object" && "detail" in error){
        errorDetail = (error as {detail: string}).detail;
    }else if(error && typeof error === "object" && "response" in error) {
        const errResp = (error as any).response?.data;
        if (errResp?.detail) {
            errorDetail = errResp.detail;
        }
    }

    const errorCode = errorDetail ? errorDetail.toUpperCase().replace(/ /g, "_") : ErrorMessage.UNKNOWN;
    const name = ErrorMessage[errorCode as keyof typeof ErrorMessage] ?? ErrorMessage.UNKNOWN;
    const message = Errors[name] || Errors[ErrorMessage.UNKNOWN];

    toast.showToast(message)
    throw { name, message };
}

export default handleApiError;

