import { url } from "@/api";
import getAuthHeaders from "@/modules/auth/helpers/getAuthHeaders";
import handleApiError from "@/modules/shared/helpers/handleApiError";
import { Message, SendMessagePayload } from "@/modules/chat/types";

const sendChatMessageMutation = async ({
    chatId,
    content,
}: SendMessagePayload): Promise<Message | undefined> => {
    const headers = getAuthHeaders();
    const response = await fetch(url.chat.sendMessage({ chatId }), {
        method: "POST",
        headers,
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        await handleApiError(response);
    }

    if (response.status === 204) {
        return undefined;
    }

    return response.json();
};

export default sendChatMessageMutation;
