import * as SecureStore from 'expo-secure-store';


type GetAuthHeadersOptions = {
    withContentType?: boolean;
};

const getAuthHeaders = (options: GetAuthHeadersOptions = {}): Headers => {
    const { withContentType = true } = options;

    const headers = new Headers();

    const jwtTokenType = SecureStore.getItem('jwtToken');
    const jwtToken = SecureStore.getItem("token");

    if (withContentType) {
        headers.append("Content-Type", "application/json");
    }

    if (jwtTokenType && jwtToken) {
        headers.append("Authorization", `${jwtTokenType} ${jwtToken}`);
    }

    return headers;
};

export default getAuthHeaders;