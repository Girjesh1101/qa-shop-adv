import { ApiClient } from "../api/api-client"
import { AuthApi } from "../api/auth.api";
import { ProductApi } from "../api/products.api";
import { envConfig } from "../config/config";
import {test as base, request} from "@playwright/test";


type APIFixtures = {
    apiClient : ApiClient;
    authApi: AuthApi;
    productApi : ProductApi;
}

export const test = base.extend<APIFixtures>({
    apiClient: async({request}, use) =>{
        await use(new ApiClient(request, `${envConfig.apiBaseURL}${envConfig.apVersion}`));
    },

    authApi: async({apiClient}, use) =>{
        await use(new AuthApi(apiClient));
    },

    productApi: async({apiClient}, use)=>{
        await use(new ProductApi(apiClient));
    }
});
